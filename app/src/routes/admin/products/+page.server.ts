import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const products = await prisma.product.findMany({
		include: {
			collections: true,
			variants: true,
			images: { orderBy: { displayOrder: 'asc' } },
		},
		orderBy: { createdAt: 'desc' }
	});

	const serializedProducts = products.map(p => ({
		...p,
		price: Number(p.price),
		salePrice: p.salePrice ? Number(p.salePrice) : null,
		totalInventory: p.variants.reduce((acc, v) => acc + v.stockCount, 0),
		status: p.isActive ? 'Active' : 'Draft'
	}));

	return {
		products: serializedProducts
	};
};
