import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const product = await prisma.product.findUnique({
		where: { slug: params.id },
		include: {
			images: { orderBy: { displayOrder: 'asc' } },
			variants: true,
			collections: true
		}
	});

	if (!product) {
		throw error(404, 'Product not found');
	}

	const serializedProduct = {
		...product,
		price: Number(product.price),
		salePrice: product.salePrice ? Number(product.salePrice) : null
	};

	return { product: serializedProduct };
};
