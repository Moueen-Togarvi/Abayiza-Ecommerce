import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const products = await prisma.product.findMany({
		where: { isActive: true },
		include: {
			images: { orderBy: { displayOrder: 'asc' } },
			collections: true
		},
		orderBy: { createdAt: 'desc' },
		take: 8
	});

	return {
		products: products.map((product: any) => ({
			...product,
			price: Number(product.price),
			salePrice: product.salePrice ? Number(product.salePrice) : null
		}))
	};
};
