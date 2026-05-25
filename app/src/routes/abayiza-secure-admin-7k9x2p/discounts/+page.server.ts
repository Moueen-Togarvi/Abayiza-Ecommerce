import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const coupons = await prisma.coupon.findMany({
		orderBy: { createdAt: 'desc' }
	});

	return {
		coupons: coupons.map((coupon: any) => ({
			...coupon,
			discountValue: Number(coupon.discountValue),
			minCartValue: coupon.minCartValue ? Number(coupon.minCartValue) : null
		}))
	};
};
