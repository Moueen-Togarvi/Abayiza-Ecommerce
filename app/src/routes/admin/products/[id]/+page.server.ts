import prisma from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { parseProductForm, validateProductForm } from '$lib/server/admin-product-form';

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
		const product = parseProductForm(data);
		const validationError = validateProductForm(product);

		if (validationError) {
			return fail(400, { error: validationError });
		}

		const existing = await prisma.product.findUnique({
			where: { slug: product.slug }
		});

		if (existing && existing.id !== params.id) {
			return fail(400, { error: 'Product slug already exists. Change the title or slug.' });
		}

		try {
			await prisma.product.update({
				where: { id: params.id },
				data: {
					name: product.name,
					slug: product.slug,
					description: product.description,
					price: product.price,
					salePrice: product.salePrice,
					isActive: product.isActive,
					collections: {
						set: product.collectionIds.map((id) => ({ id }))
					}
				},
				select: { id: true }
			});

			await prisma.productImage.deleteMany({
				where: { productId: params.id }
			});

			if (product.imageUrl) {
				await prisma.productImage.create({
					data: {
						productId: params.id,
						url: product.imageUrl,
						altText: product.name,
						displayOrder: 0
					}
				});
			}

			await prisma.productVariant.deleteMany({
				where: { productId: params.id }
			});

			await prisma.productVariant.createMany({
				data: product.variants.map((variant) => ({
					...variant,
					productId: params.id
				}))
			});
		} catch (e) {
			return fail(500, { error: 'Failed to update product. Check duplicate SKU values.' });
		}

		throw redirect(303, `/admin/products/${params.id}`);
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
