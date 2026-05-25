import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const collectionSlug = url.searchParams.get('collection');

	const [products, collections] = await Promise.all([
		prisma.product.findMany({
			where: {
				isActive: true,
				...(collectionSlug
					? {
							collections: {
								some: {
									slug: collectionSlug
								}
							}
						}
					: {})
			},
			include: {
				images: { orderBy: { displayOrder: 'asc' } },
				variants: true,
				collections: true
			}
		}),
		prisma.collection.findMany({
			where: { isVisible: true },
			orderBy: { displayOrder: 'asc' }
		})
	]);

	const serializedProducts = products.map((p: any) => ({
		...p,
		price: Number(p.price),
		salePrice: p.salePrice ? Number(p.salePrice) : null
	}));
	const colors = Array.from(
		new Set(products.flatMap((product: any) => product.variants.map((variant: any) => variant.color)))
	).filter(Boolean);

	return {
		products: serializedProducts,
		collections,
		colors,
		selectedCollection: collectionSlug
	};
};
