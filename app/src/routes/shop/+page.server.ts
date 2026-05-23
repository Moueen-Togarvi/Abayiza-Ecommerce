import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const collectionSlug = url.searchParams.get('collection');

	let products = [];

	if (collectionSlug) {
		products = await prisma.product.findMany({
			where: {
				isActive: true,
				collections: {
					some: {
						slug: collectionSlug
					}
				}
			},
			include: {
				images: {
					orderBy: { displayOrder: 'asc' }
				},
				variants: true
			}
		});
	} else {
		products = await prisma.product.findMany({
			where: {
				isActive: true
			},
			include: {
				images: {
					orderBy: { displayOrder: 'asc' }
				},
				variants: true
			}
		});
	}

	const serializedProducts = products.map(p => ({
		...p,
		price: Number(p.price),
		salePrice: p.salePrice ? Number(p.salePrice) : null
	}));

	return {
		products: serializedProducts
	};
};
