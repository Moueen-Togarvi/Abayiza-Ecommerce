import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Total orders and sales
	const orders = await prisma.order.findMany({
		orderBy: { createdAt: 'desc' },
		include: { user: true }
	});

	const totalOrders = orders.length;
	const totalSales = orders.reduce((acc, order) => acc + Number(order.totalAmount), 0);
	const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

	// Recent Orders
	const recentOrders = orders.slice(0, 5).map(o => ({
		id: o.id,
		shortId: o.id.slice(-6),
		customerName: o.user ? `${o.user.firstName} ${o.user.lastName}` : 'Guest',
		status: o.status,
		total: Number(o.totalAmount)
	}));

	// Top Products (Simplification: fetch active products)
	const topProducts = await prisma.product.findMany({
		where: { isActive: true },
		take: 4,
		include: { images: { orderBy: { displayOrder: 'asc' } } }
	});

	// Low Stock Alerts (variants with < 10 stock)
	const lowStockVariants = await prisma.productVariant.findMany({
		where: { stockCount: { lt: 10 } },
		include: { product: { include: { images: { orderBy: { displayOrder: 'asc' } } } } },
		take: 5
	});

	return {
		stats: {
			totalOrders,
			totalSales,
			averageOrderValue,
			conversionRate: 3.2 // Mock value for now
		},
		recentOrders,
		topProducts: topProducts.map(p => ({
			id: p.id,
			name: p.name,
			image: p.images[0]?.url || '',
			sales: 0,
			revenue: 0
		})),
		lowStockVariants: lowStockVariants.map(v => ({
			id: v.id,
			productName: v.product.name,
			sku: v.sku,
			size: v.size,
			stockCount: v.stockCount,
			image: v.product.images[0]?.url || ''
		}))
	};
};
