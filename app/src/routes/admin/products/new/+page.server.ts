import { parseProductForm, validateProductForm } from '$lib/server/admin-product-form';
import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const collections = await prisma.collection.findMany({
		orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }]
	});

	return { collections };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const product = parseProductForm(data);
		const validationError = validateProductForm(product);

		if (validationError) {
			return fail(400, { error: validationError });
		}

		const existing = await prisma.product.findUnique({
			where: { slug: product.slug }
		});

		if (existing) {
			return fail(400, { error: 'Product slug already exists. Change the title or slug.' });
		}

		let createdProductId: string;

		try {
			const createdProduct = await prisma.product.create({
				data: {
					name: product.name,
					slug: product.slug,
					description: product.description,
					price: product.price,
					salePrice: product.salePrice,
					isActive: product.isActive,
					collections: {
						connect: product.collectionIds.map((id) => ({ id }))
					},
					images: product.imageUrl
						? {
								create: [
									{
										url: product.imageUrl,
										altText: product.name,
										displayOrder: 0
									}
								]
							}
						: undefined,
					variants: {
						create: product.variants
					}
				}
			});
			createdProductId = createdProduct.id;
		} catch (error) {
			return fail(500, {
				error: 'Failed to create product. Check duplicate SKU or category selection.'
			});
		}

		throw redirect(303, `/admin/products/${createdProductId}`);
	}
};
