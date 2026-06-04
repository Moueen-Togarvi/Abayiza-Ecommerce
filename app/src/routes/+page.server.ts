import prisma from '$lib/server/prisma';
import {
	getFallbackCollections,
	getFallbackProducts,
	getFallbackReviewPhotos,
	isDatabaseUnavailable,
	serializeStorefrontProduct,
	warnStorefrontFallback
} from '$lib/server/storefront-fallback';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
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
			products: products.map(serializeStorefrontProduct),
			collections,
			reviewPhotos: reviewPhotos.map((photo) => ({
				id: photo.id,
				url: photo.url
			}))
		};
	} catch (error) {
		if (!isDatabaseUnavailable(error)) {
			throw error;
		}

		warnStorefrontFallback('/', error);

		return {
			products: getFallbackProducts({ take: 12 }),
			collections: getFallbackCollections(),
			reviewPhotos: getFallbackReviewPhotos()
		};
	}
};
