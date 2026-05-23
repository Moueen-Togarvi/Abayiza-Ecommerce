import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const collections = await prisma.collection.findMany({
		where: { isVisible: true },
		orderBy: { displayOrder: 'asc' },
		include: {
			_count: {
				select: { products: true }
			}
		}
	});

	return {
		collections
	};
};
