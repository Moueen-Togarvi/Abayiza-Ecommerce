import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const image = (path: string) => path.replaceAll(' ', '%20');

const categories = [
	{
		name: 'Daily Wear',
		slug: 'daily-wear',
		description: 'Clean everyday abayas for modest daily styling.',
		imageUrl: image('/ChatGPT Image May 24, 2026, 02_01_35 AM.png'),
		displayOrder: 1
	},
	{
		name: 'Nida Essentials',
		slug: 'nida-essentials',
		description: 'Soft Nida fabric pieces with easy drape and breathable comfort.',
		imageUrl: image('/ChatGPT Image May 25, 2026, 06_25_42 PM.png'),
		displayOrder: 2
	},
	{
		name: 'Occasion Wear',
		slug: 'occasion-wear',
		description: 'Elegant abayas for events, Eid visits, and formal gatherings.',
		imageUrl: '/abaya22.png',
		displayOrder: 3
	},
	{
		name: 'Embroidered Edit',
		slug: 'embroidered-edit',
		description: 'Statement abayas finished with embroidery, trims, and refined detail.',
		imageUrl: image('/ChatGPT Image May 25, 2026, 06_25_25 PM.png'),
		displayOrder: 4
	},
	{
		name: 'Hijabs & Veils',
		slug: 'hijabs-veils',
		description: 'Hijabs, khimars, and veil sets to complete modest outfits.',
		imageUrl: '/abaya11.png',
		displayOrder: 5
	}
];

const products = [
	{
		name: 'Ayla Nida Abaya',
		slug: 'ayla-nida-abaya',
		description:
			'Soft premium Nida abaya with a relaxed modest fall, neat cuffs, and everyday-friendly movement.',
		fabricDetails: 'Premium Nida fabric, opaque finish, relaxed A-line silhouette.',
		price: 8500,
		salePrice: 7650,
		images: [image('/ChatGPT Image May 24, 2026, 02_01_35 AM.png')],
		collections: ['daily-wear', 'nida-essentials'],
		variants: [
			{ color: 'Sage', size: 'S (52)', sku: 'ABY-AYLA-SAGE-S', stockCount: 8 },
			{ color: 'Sage', size: 'M (54)', sku: 'ABY-AYLA-SAGE-M', stockCount: 10 },
			{ color: 'Sage', size: 'L (56)', sku: 'ABY-AYLA-SAGE-L', stockCount: 7 }
		]
	},
	{
		name: 'Noor Black Nida Abaya',
		slug: 'noor-black-nida-abaya',
		description:
			'Classic black Nida abaya designed for daily wear with a clean front, soft sleeves, and a graceful drape.',
		fabricDetails: 'Premium black Nida, lightweight, non-transparent, soft touch.',
		price: 7800,
		salePrice: 6990,
		images: [image('/ChatGPT Image May 25, 2026, 06_25_42 PM.png')],
		collections: ['daily-wear', 'nida-essentials'],
		variants: [
			{ color: 'Black', size: 'S (52)', sku: 'ABY-NOOR-BLK-S', stockCount: 9 },
			{ color: 'Black', size: 'M (54)', sku: 'ABY-NOOR-BLK-M', stockCount: 12 },
			{ color: 'Black', size: 'L (56)', sku: 'ABY-NOOR-BLK-L', stockCount: 8 }
		]
	},
	{
		name: 'Zahra Emerald Layered Abaya',
		slug: 'zahra-emerald-layered-abaya',
		description:
			'Layered emerald abaya with airy movement and a composed silhouette for dinners, Eid, and evening styling.',
		fabricDetails: 'Chiffon overlay with soft inner lining and fluid layered panels.',
		price: 10500,
		salePrice: 9450,
		images: ['/abaya22.png'],
		collections: ['occasion-wear'],
		variants: [
			{ color: 'Emerald', size: 'S (52)', sku: 'ABY-ZAHRA-EMR-S', stockCount: 6 },
			{ color: 'Emerald', size: 'M (54)', sku: 'ABY-ZAHRA-EMR-M', stockCount: 8 },
			{ color: 'Emerald', size: 'L (56)', sku: 'ABY-ZAHRA-EMR-L', stockCount: 5 }
		]
	},
	{
		name: 'Mira Midnight Veil Abaya',
		slug: 'mira-midnight-veil-abaya',
		description:
			'Midnight veil abaya with a refined contrast layer and soft volume for premium modest dressing.',
		fabricDetails: 'Light veil overlay, lined body, polished finishing.',
		price: 11500,
		salePrice: 10350,
		images: ['/abaya11.png'],
		collections: ['occasion-wear', 'hijabs-veils'],
		variants: [
			{ color: 'Midnight', size: 'S (52)', sku: 'ABY-MIRA-MID-S', stockCount: 5 },
			{ color: 'Midnight', size: 'M (54)', sku: 'ABY-MIRA-MID-M', stockCount: 7 },
			{ color: 'Midnight', size: 'L (56)', sku: 'ABY-MIRA-MID-L', stockCount: 4 }
		]
	},
	{
		name: 'Huda Embroidered Abaya',
		slug: 'huda-embroidered-abaya',
		description:
			'Black embroidered abaya with premium sleeve detail, ideal for occasion wear and gift-ready dressing.',
		fabricDetails: 'Soft crepe base with embroidered sleeve panels and clean edge finishing.',
		price: 13500,
		salePrice: 12150,
		images: [image('/ChatGPT Image May 25, 2026, 06_25_25 PM.png')],
		collections: ['embroidered-edit', 'occasion-wear'],
		variants: [
			{ color: 'Black', size: 'M (54)', sku: 'ABY-HUDA-BLK-M', stockCount: 5 },
			{ color: 'Black', size: 'L (56)', sku: 'ABY-HUDA-BLK-L', stockCount: 4 },
			{ color: 'Black', size: 'XL (58)', sku: 'ABY-HUDA-BLK-XL', stockCount: 3 }
		]
	},
	{
		name: 'Amani Pearl Sleeve Abaya',
		slug: 'amani-pearl-sleeve-abaya',
		description:
			'Occasion abaya with pearl-inspired sleeve work and a softly structured fall for refined gatherings.',
		fabricDetails: 'Premium crepe blend, pearl sleeve detailing, modest straight silhouette.',
		price: 14500,
		salePrice: 12950,
		images: [image('/ChatGPT Image May 25, 2026, 06_25_30 PM.png')],
		collections: ['embroidered-edit', 'occasion-wear'],
		variants: [
			{ color: 'Ivory', size: 'S (52)', sku: 'ABY-AMANI-IVR-S', stockCount: 4 },
			{ color: 'Ivory', size: 'M (54)', sku: 'ABY-AMANI-IVR-M', stockCount: 5 },
			{ color: 'Ivory', size: 'L (56)', sku: 'ABY-AMANI-IVR-L', stockCount: 3 }
		]
	},
	{
		name: 'Imaan Front Open Abaya',
		slug: 'imaan-front-open-abaya',
		description:
			'Front-open abaya made for easy layering over inner dresses, jeans, or daily modest outfits.',
		fabricDetails: 'Soft Nida blend with open-front cut and relaxed sleeve.',
		price: 9200,
		salePrice: 8290,
		images: [image('/ChatGPT Image May 25, 2026, 06_25_51 PM.png')],
		collections: ['daily-wear', 'nida-essentials'],
		variants: [
			{ color: 'Olive', size: 'S (52)', sku: 'ABY-IMAAN-OLV-S', stockCount: 7 },
			{ color: 'Olive', size: 'M (54)', sku: 'ABY-IMAAN-OLV-M', stockCount: 9 },
			{ color: 'Olive', size: 'L (56)', sku: 'ABY-IMAAN-OLV-L', stockCount: 6 }
		]
	},
	{
		name: 'Zoya Premium Nida Set',
		slug: 'zoya-premium-nida-set',
		description:
			'Premium Nida abaya set with matching scarf, designed as a complete modest outfit.',
		fabricDetails: 'Premium Nida abaya with matching chiffon scarf included.',
		price: 12500,
		salePrice: 11250,
		images: [image('/ChatGPT Image May 25, 2026, 06_07_28 PM.png')],
		collections: ['nida-essentials', 'occasion-wear'],
		variants: [
			{ color: 'Charcoal', size: 'S (52)', sku: 'ABY-ZOYA-CHR-S', stockCount: 5 },
			{ color: 'Charcoal', size: 'M (54)', sku: 'ABY-ZOYA-CHR-M', stockCount: 6 },
			{ color: 'Charcoal', size: 'L (56)', sku: 'ABY-ZOYA-CHR-L', stockCount: 4 }
		]
	},
	{
		name: 'Safa Chiffon Hijab',
		slug: 'safa-chiffon-hijab',
		description:
			'Soft chiffon hijab with a light fall, made for daily styling and occasion pairing.',
		fabricDetails: 'Premium chiffon, soft touch, breathable and easy to pin.',
		price: 2200,
		salePrice: 1990,
		images: ['/abaya22.png'],
		collections: ['hijabs-veils'],
		variants: [
			{ color: 'Black', size: 'One Size', sku: 'HJ-SAFACHF-BLK-OS', stockCount: 20 },
			{ color: 'Ivory', size: 'One Size', sku: 'HJ-SAFACHF-IVR-OS', stockCount: 15 },
			{ color: 'Emerald', size: 'One Size', sku: 'HJ-SAFACHF-EMR-OS', stockCount: 12 }
		]
	},
	{
		name: 'Layan Soft Khimar',
		slug: 'layan-soft-khimar',
		description:
			'Full coverage khimar with a soft rounded fall, made for prayer, daily errands, and modest layering.',
		fabricDetails: 'Lightweight crepe blend with generous coverage.',
		price: 3500,
		salePrice: 3150,
		images: ['/abaya11.png'],
		collections: ['hijabs-veils', 'daily-wear'],
		variants: [
			{ color: 'Black', size: 'One Size', sku: 'KH-LAYAN-BLK-OS', stockCount: 14 },
			{ color: 'Navy', size: 'One Size', sku: 'KH-LAYAN-NVY-OS', stockCount: 10 }
		]
	},
	{
		name: 'Farah Prayer Chaddar',
		slug: 'farah-prayer-chaddar',
		description:
			'Comfortable prayer chaddar with easy coverage and a soft breathable fabric feel.',
		fabricDetails: 'Soft breathable crepe, easy-care modest coverage.',
		price: 4200,
		salePrice: null,
		images: [image('/ChatGPT Image May 25, 2026, 06_25_13 PM.png')],
		collections: ['hijabs-veils'],
		variants: [
			{ color: 'White', size: 'One Size', sku: 'CH-FARAH-WHT-OS', stockCount: 12 },
			{ color: 'Black', size: 'One Size', sku: 'CH-FARAH-BLK-OS', stockCount: 12 }
		]
	},
	{
		name: 'Haya Everyday Abaya',
		slug: 'haya-everyday-abaya',
		description:
			'Simple everyday abaya with clean finishing, modest coverage, and a light comfortable feel.',
		fabricDetails: 'Nida blend, relaxed fit, easy daily care.',
		price: 7200,
		salePrice: null,
		images: [image('/ChatGPT Image May 25, 2026, 06_25_42 PM.png')],
		collections: ['daily-wear'],
		variants: [
			{ color: 'Black', size: 'S (52)', sku: 'ABY-HAYA-BLK-S', stockCount: 10 },
			{ color: 'Black', size: 'M (54)', sku: 'ABY-HAYA-BLK-M', stockCount: 12 },
			{ color: 'Black', size: 'L (56)', sku: 'ABY-HAYA-BLK-L', stockCount: 8 }
		]
	}
];

async function clearDatabase() {
	await prisma.review.deleteMany();
	await prisma.orderItem.deleteMany();
	await prisma.order.deleteMany();
	await prisma.address.deleteMany();
	await prisma.productImage.deleteMany();
	await prisma.productVariant.deleteMany();
	await prisma.product.deleteMany();
	await prisma.collection.deleteMany();
	await prisma.coupon.deleteMany();
	await prisma.storeSetting.deleteMany();
	await prisma.user.deleteMany();
}

async function main() {
	console.log('Clearing database...');
	await clearDatabase();

	console.log('Seeding categories...');
	for (const category of categories) {
		await prisma.collection.create({ data: category });
	}

	console.log('Seeding products...');
	for (const product of products) {
		await prisma.product.create({
			data: {
				name: product.name,
				slug: product.slug,
				description: product.description,
				fabricDetails: product.fabricDetails,
				price: product.price,
				salePrice: product.salePrice,
				isActive: true,
				images: {
					create: product.images.map((url, index) => ({
						url,
						altText: product.name,
						displayOrder: index
					}))
				},
				variants: {
					create: product.variants
				},
				collections: {
					connect: product.collections.map((slug) => ({ slug }))
				}
			}
		});
	}

	await prisma.user.create({
		data: {
			email: 'admin@abayiza.com',
			firstName: 'Abayiza',
			lastName: 'Admin',
			role: 'SUPER_ADMIN'
		}
	});

	await prisma.storeSetting.createMany({
		data: [
			{ key: 'store_currency', value: 'PKR', description: 'Primary storefront currency' },
			{ key: 'whatsapp_catalog', value: 'https://wa.me/c/923116857822', description: 'Abayiza WhatsApp catalog' },
			{ key: 'whatsapp_order_number', value: '923116857822', description: 'WhatsApp order support number' }
		]
	});

	console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
