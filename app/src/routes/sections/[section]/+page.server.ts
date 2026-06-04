import prisma from '$lib/server/prisma';
import {
	getFallbackProducts,
	isDatabaseUnavailable,
	serializeStorefrontProduct,
	warnStorefrontFallback
} from '$lib/server/storefront-fallback';
import {
	HOME_PAGE_KEY,
	HOME_SECTION_PAGE_SIZE,
	getHomeSectionConfig,
	homeSectionHref
} from '$lib/shared/home-sections';
import { error as kitError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const productInclude = {
	images: { orderBy: { displayOrder: 'asc' } },
	variants: true,
	collections: true
} as const;

function requestedPageFrom(url: URL) {
	const requestedPage = Number(url.searchParams.get('page') ?? '1');

	return Number.isFinite(requestedPage) && requestedPage > 0 ? Math.floor(requestedPage) : 1;
}

function buildPagination(total: number, requestedPage: number) {
	const totalPages = Math.max(1, Math.ceil(total / HOME_SECTION_PAGE_SIZE));
	const page = Math.min(requestedPage, totalPages);

	return {
		page,
		pageSize: HOME_SECTION_PAGE_SIZE,
		total,
		totalPages,
		hasPrevious: page > 1,
		hasNext: page < totalPages,
		previousPage: Math.max(1, page - 1),
		nextPage: Math.min(totalPages, page + 1)
	};
}

export const load: PageServerLoad = async ({ params, url }) => {
	const section = getHomeSectionConfig(params.section);

	if (!section) {
		throw kitError(404, 'Section not found');
	}

	const requestedPage = requestedPageFrom(url);

	try {
		const storefrontSectionProduct = (prisma as any).storefrontSectionProduct;
		const selectedCount = storefrontSectionProduct?.count
			? await storefrontSectionProduct.count({
					where: {
						pageKey: HOME_PAGE_KEY,
						sectionKey: section.key,
						product: { isActive: true }
					}
				})
			: 0;

		if (selectedCount > 0) {
			const pagination = buildPagination(selectedCount, requestedPage);
			const placements = await storefrontSectionProduct.findMany({
				where: {
					pageKey: HOME_PAGE_KEY,
					sectionKey: section.key,
					product: { isActive: true }
				},
				include: {
					product: {
						include: productInclude
					}
				},
				orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
				skip: (pagination.page - 1) * HOME_SECTION_PAGE_SIZE,
				take: HOME_SECTION_PAGE_SIZE
			});

			return {
				section: {
					...section,
					href: homeSectionHref(section.key)
				},
				products: placements.map((placement: any) => serializeStorefrontProduct(placement.product)),
				pagination,
				usesFallback: false
			};
		}

		const productCount = await prisma.product.count({
			where: { isActive: true }
		});
		const pagination = buildPagination(productCount, requestedPage);
		const products = await prisma.product.findMany({
			where: { isActive: true },
			include: productInclude,
			orderBy: { createdAt: 'desc' },
			skip: (pagination.page - 1) * HOME_SECTION_PAGE_SIZE,
			take: HOME_SECTION_PAGE_SIZE
		});

		return {
			section: {
				...section,
				href: homeSectionHref(section.key)
			},
			products: products.map(serializeStorefrontProduct),
			pagination,
			usesFallback: true
		};
	} catch (error) {
		if (!isDatabaseUnavailable(error)) {
			throw error;
		}

		warnStorefrontFallback(homeSectionHref(section.key), error);

		const fallbackProducts = getFallbackProducts();
		const pagination = buildPagination(fallbackProducts.length, requestedPage);

		return {
			section: {
				...section,
				href: homeSectionHref(section.key)
			},
			products: fallbackProducts.slice(
				(pagination.page - 1) * HOME_SECTION_PAGE_SIZE,
				pagination.page * HOME_SECTION_PAGE_SIZE
			),
			pagination,
			usesFallback: true
		};
	}
};
