import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [products, collections, reviewPhotos] = await Promise.all([
		prisma.product.findMany({
			where: { isActive: true },
			include: {
				images: { orderBy: { displayOrder: 'asc' } },
				variants: true,
				collections: true
			},
			orderBy: { createdAt: 'desc' },
			take: 12
		}),
		prisma.collection.findMany({
			where: { isVisible: true },
			orderBy: { displayOrder: 'asc' },
			include: {
				_count: {
					select: { products: true }
				}
			}
		}),
		prisma.reviewPhoto.findMany({
			where: { isVisible: true },
			orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }]
		})
	]);

	return {
		products: products.map((product: any) => ({
			...product,
			price: Number(product.price),
			salePrice: product.salePrice ? Number(product.salePrice) : null
		})),
		collections,
		reviewPhotos: reviewPhotos.map((photo) => ({
			id: photo.id,
			url: photo.url
		}))
	};
};
