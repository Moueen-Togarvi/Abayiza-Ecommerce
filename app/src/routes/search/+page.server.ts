import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q')?.trim() ?? '';
	const products =
		query.length >= 2
			? await prisma.product.findMany({
					where: {
						isActive: true,
						OR: [
							{ name: { contains: query, mode: 'insensitive' } },
							{ description: { contains: query, mode: 'insensitive' } },
							{
								collections: {
									some: { name: { contains: query, mode: 'insensitive' } }
								}
							}
						]
					},
					include: {
						images: { orderBy: { displayOrder: 'asc' } },
						collections: true,
						variants: true
					},
					orderBy: { createdAt: 'desc' }
				})
			: [];

	const collections = await prisma.collection.findMany({
		where: { isVisible: true },
		orderBy: { displayOrder: 'asc' },
		take: 8
	});

	return {
		query,
		products: products.map((product: any) => ({
			...product,
			price: Number(product.price),
			salePrice: product.salePrice ? Number(product.salePrice) : null
		})),
		collections
	};
};
