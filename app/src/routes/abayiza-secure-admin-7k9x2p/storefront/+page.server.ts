import { setAdminFlash } from '$lib/server/admin-flash';
import prisma from '$lib/server/prisma';
import { serializeStorefrontProduct } from '$lib/server/storefront-fallback';
import {
	defaultStorefrontSettings,
	getSettings,
	saveSettings,
	toLines
} from '$lib/server/store-settings';
import {
	HOME_PAGE_KEY,
	HOME_SECTION_CONFIGS,
	HOME_SECTION_KEYS,
	homeSectionHref,
	isHomeSectionKey
} from '$lib/shared/home-sections';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const productInclude = {
	images: { orderBy: { displayOrder: 'asc' } },
	variants: true,
	collections: true
} as const;

export const load: PageServerLoad = async () => {
	const storefrontSectionProduct = (prisma as any).storefrontSectionProduct;
	const [products, placements, storefrontSettings] = await Promise.all([
		prisma.product.findMany({
			where: { isActive: true },
			include: productInclude,
			orderBy: { name: 'asc' }
		}),
		storefrontSectionProduct?.findMany
			? storefrontSectionProduct.findMany({
					where: {
						pageKey: HOME_PAGE_KEY,
						sectionKey: { in: [...HOME_SECTION_KEYS] },
						product: { isActive: true }
					},
					include: {
						product: {
							include: productInclude
						}
					},
					orderBy: [{ sectionKey: 'asc' }, { displayOrder: 'asc' }, { createdAt: 'asc' }]
				})
			: Promise.resolve([]),
		getSettings(defaultStorefrontSettings)
	]);

	const selectedProductsBySection = new Map<
		string,
		ReturnType<typeof serializeStorefrontProduct>[]
	>();

	for (const placement of placements) {
		const selectedProducts = selectedProductsBySection.get(placement.sectionKey) ?? [];
		selectedProducts.push(serializeStorefrontProduct(placement.product));
		selectedProductsBySection.set(placement.sectionKey, selectedProducts);
	}

	return {
		saleTapeItems: storefrontSettings.sale_tape_items,
		products: products.map(serializeStorefrontProduct),
		sections: HOME_SECTION_CONFIGS.map((section) => ({
			...section,
			viewAllHref: homeSectionHref(section.key),
			products: selectedProductsBySection.get(section.key) ?? []
		}))
	};
};

export const actions: Actions = {
	saveSaleTape: async ({ request, cookies }) => {
		const data = await request.formData();
		const rawItems = String(data.get('saleTapeItems') ?? '');
		const items = toLines(rawItems).slice(0, 8);

		if (!items.length) {
			return fail(400, {
				error: 'Sale tape needs at least one text item.',
				saleTapeItems: rawItems
			});
		}

		await saveSettings({
			sale_tape_items: items.join('\n')
		});

		setAdminFlash(cookies, 'Sale tape text updated successfully.');
		throw redirect(303, '/abayiza-secure-admin-7k9x2p/storefront');
	},

	saveSection: async ({ request, cookies }) => {
		const data = await request.formData();
		const sectionKey = String(data.get('sectionKey') ?? '');

		if (!isHomeSectionKey(sectionKey)) {
			return fail(400, { error: 'Unknown storefront section.' });
		}

		if (!(prisma as any).storefrontSectionProduct) {
			return fail(500, {
				error:
					'Storefront section controls need the regenerated Prisma client. Restart the dev server and try again.'
			});
		}

		const productIds = Array.from(
			new Set(
				data
					.getAll('productIds')
					.map((value) => String(value).trim())
					.filter(Boolean)
			)
		);

		const activeProducts = productIds.length
			? await prisma.product.findMany({
					where: {
						id: { in: productIds },
						isActive: true
					},
					select: { id: true }
				})
			: [];
		const activeProductIds = new Set(activeProducts.map((product) => product.id));
		const validProductIds = productIds.filter((id) => activeProductIds.has(id));

		await prisma.$transaction(async (tx) => {
			await tx.storefrontSectionProduct.deleteMany({
				where: {
					pageKey: HOME_PAGE_KEY,
					sectionKey
				}
			});

			if (validProductIds.length) {
				await tx.storefrontSectionProduct.createMany({
					data: validProductIds.map((productId, displayOrder) => ({
						pageKey: HOME_PAGE_KEY,
						sectionKey,
						productId,
						displayOrder
					}))
				});
			}
		});

		const section = HOME_SECTION_CONFIGS.find((item) => item.key === sectionKey);
		setAdminFlash(cookies, `${section?.title ?? 'Storefront section'} updated successfully.`);
		throw redirect(303, '/abayiza-secure-admin-7k9x2p/storefront');
	}
};
