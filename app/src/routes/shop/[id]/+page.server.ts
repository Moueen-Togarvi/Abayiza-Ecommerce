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

	if (!product || !product.isActive) {
		throw error(404, 'Product not found');
	}

	const relatedProducts = await prisma.product.findMany({
		where: {
			isActive: true,
			id: { not: product.id },
			collections: {
				some: {
					id: { in: product.collections.map((collection: any) => collection.id) }
				}
			}
		},
		include: {
			images: { orderBy: { displayOrder: 'asc' } },
			variants: true,
			collections: true
		},
		take: 4
	});

	const serializedProduct = {
		...product,
		price: Number(product.price),
		salePrice: product.salePrice ? Number(product.salePrice) : null
	};

	return {
		product: serializedProduct,
		relatedProducts: relatedProducts.map((item: any) => ({
			...item,
			price: Number(item.price),
			salePrice: item.salePrice ? Number(item.salePrice) : null
		}))
	};
};
