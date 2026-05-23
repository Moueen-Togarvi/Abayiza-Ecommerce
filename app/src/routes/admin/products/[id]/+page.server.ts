import prisma from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const product = await prisma.product.findUnique({
		where: { id: params.id },
		include: {
			images: { orderBy: { displayOrder: 'asc' } },
			variants: true,
			collections: true
		}
	});

	if (!product) {
		throw error(404, 'Product not found');
	}

	const allCollections = await prisma.collection.findMany({
		orderBy: { displayOrder: 'asc' }
	});

	return {
		product: {
			...product,
			price: Number(product.price),
			salePrice: product.salePrice ? Number(product.salePrice) : null
		},
		allCollections
	};
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const data = await request.formData();

		const name = data.get('name') as string;
		const description = data.get('description') as string;
		const price = parseFloat(data.get('price') as string);
		const salePrice = data.get('salePrice') ? parseFloat(data.get('salePrice') as string) : null;
		const isActive = data.get('isActive') === 'true';
		const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

		if (!name || isNaN(price)) {
			return fail(400, { error: 'Name and valid price are required.' });
		}

		try {
			await prisma.product.update({
				where: { id: params.id },
				data: {
					name,
					slug,
					description,
					price,
					salePrice,
					isActive
				}
			});
		} catch (e) {
			return fail(500, { error: 'Failed to update product.' });
		}

		throw redirect(303, '/admin/products');
	},

	delete: async ({ params }) => {
		try {
			await prisma.product.delete({
				where: { id: params.id }
			});
		} catch (e) {
			return fail(500, { error: 'Failed to delete product.' });
		}

		throw redirect(303, '/admin/products');
	}
};
