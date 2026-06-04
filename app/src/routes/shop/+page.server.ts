import prisma from '$lib/server/prisma';
import {
	getFallbackCollections,
	getFallbackColors,
	getFallbackProducts,
	isDatabaseUnavailable,
	serializeStorefrontProduct,
	warnStorefrontFallback
} from '$lib/server/storefront-fallback';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const collectionSlug = url.searchParams.get('collection');

	try {
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

		const serializedProducts = products.map(serializeStorefrontProduct);
		const colors = Array.from(
			new Set(
				products.flatMap((product: any) => product.variants.map((variant: any) => variant.color))
			)
		).filter(Boolean);

		return {
			products: serializedProducts,
			collections,
			colors,
			selectedCollection: collectionSlug
		};
	} catch (error) {
		if (!isDatabaseUnavailable(error)) {
			throw error;
		}

		warnStorefrontFallback('/shop', error);

		const products = getFallbackProducts({ collectionSlug });

		return {
			products,
			collections: getFallbackCollections(),
			colors: getFallbackColors(products),
			selectedCollection: collectionSlug
		};
	}
};
