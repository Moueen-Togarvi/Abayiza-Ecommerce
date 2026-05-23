import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const customers = await prisma.user.findMany({
		include: {
			orders: true
		},
		orderBy: { createdAt: 'desc' }
	});

	const serializedCustomers = customers.map(c => {
		const totalSpent = c.orders.reduce((acc, order) => acc + Number(order.totalAmount), 0);
		return {
			id: c.id,
			firstName: c.firstName,
			lastName: c.lastName,
			email: c.email,
			orderCount: c.orders.length,
			totalSpent
		};
	});

	return {
		customers: serializedCustomers
	};
};
