import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const orders = await prisma.order.findMany({
		include: {
			user: true,
			items: {
				include: { product: true }
			}
		},
		orderBy: { createdAt: 'desc' }
	});

	const serializedOrders = orders.map(o => ({
		...o,
		subtotal: Number(o.subtotal),
		shippingCost: Number(o.shippingCost),
		total: Number(o.totalAmount),
		items: o.items.map(item => ({
			...item,
			priceAtPurchase: Number(item.priceAtPurchase),
		}))
	}));

	return {
		orders: serializedOrders
	};
};
