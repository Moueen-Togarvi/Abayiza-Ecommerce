import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const image = (path: string) => path.replaceAll(' ', '%20');
const toSlug = (value: string) =>
	value
		.trim()
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

const categories = [
	'Daily Wear',
	'Nida Essentials',
	'Occasion',
	'Signature',
	'Premium',
	'Layered',
	'Soft Black',
	'Limited'
].map((name) => ({
	name,
	slug: toSlug(name),
	description: null,
	imageUrl: null
}));

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
		name: 'Safa Essential Abaya',
		slug: 'safa-essential-abaya',
		description:
			'Clean everyday abaya with soft movement, relaxed sleeves, and a polished modest shape.',
		fabricDetails: 'Soft Nida fabric, relaxed fit, daily modest silhouette.',
		price: 8200,
		salePrice: 7380,
		images: [image('/ChatGPT Image May 24, 2026, 02_01_35 AM.png')],
		collections: ['daily-wear', 'nida-essentials'],
		variants: [
			{ color: 'Sage', size: 'S (52)', sku: 'ABY-SAFA-SAGE-S', stockCount: 8 },
			{ color: 'Sage', size: 'M (54)', sku: 'ABY-SAFA-SAGE-M', stockCount: 9 },
			{ color: 'Sage', size: 'L (56)', sku: 'ABY-SAFA-SAGE-L', stockCount: 6 }
		]
	},
	{
		name: 'Zahra Wrap Abaya',
		slug: 'zahra-wrap-abaya',
		description:
			'Layered wrap-style abaya with fluid movement and a graceful evening-ready fall.',
		fabricDetails: 'Chiffon layer over soft lining with wrap-inspired front movement.',
		price: 10400,
		salePrice: 9360,
		images: ['/abaya22.png'],
		collections: ['occasion', 'layered'],
		variants: [
			{ color: 'Emerald', size: 'S (52)', sku: 'ABY-ZAHRA-EMR-S', stockCount: 6 },
			{ color: 'Emerald', size: 'M (54)', sku: 'ABY-ZAHRA-EMR-M', stockCount: 8 },
			{ color: 'Emerald', size: 'L (56)', sku: 'ABY-ZAHRA-EMR-L', stockCount: 5 }
		]
	},
	{
		name: 'Lina Silk Blend Abaya',
		slug: 'lina-silk-blend-abaya',
		description:
			'Silk-blend abaya with refined contrast, soft volume, and a premium occasion finish.',
		fabricDetails: 'Silk blend finish with light veil-inspired overlay.',
		price: 11600,
		salePrice: 10440,
		images: ['/abaya11.png'],
		collections: ['signature', 'premium'],
		variants: [
			{ color: 'Midnight', size: 'S (52)', sku: 'ABY-LINA-MID-S', stockCount: 5 },
			{ color: 'Midnight', size: 'M (54)', sku: 'ABY-LINA-MID-M', stockCount: 7 },
			{ color: 'Midnight', size: 'L (56)', sku: 'ABY-LINA-MID-L', stockCount: 4 }
		]
	},
	{
		name: 'Nour Embellished Abaya',
		slug: 'nour-embellished-abaya',
		description:
			'Soft black embellished abaya with premium sleeve detail for occasion wear and refined styling.',
		fabricDetails: 'Soft crepe base with embroidered sleeve panels and clean edge finishing.',
		price: 13500,
		salePrice: 12150,
		images: [image('/ChatGPT Image May 25, 2026, 06_25_25 PM.png')],
		collections: ['soft-black', 'premium', 'occasion'],
		variants: [
			{ color: 'Black', size: 'M (54)', sku: 'ABY-NOUR-BLK-M', stockCount: 5 },
			{ color: 'Black', size: 'L (56)', sku: 'ABY-NOUR-BLK-L', stockCount: 4 },
			{ color: 'Black', size: 'XL (58)', sku: 'ABY-NOUR-BLK-XL', stockCount: 3 }
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
		collections: ['premium', 'occasion'],
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
		name: 'Zoya Premium Nida Abaya Set',
		slug: 'zoya-premium-nida-abaya-set',
		description:
			'Premium Nida abaya set with matching scarf, designed as a complete modest outfit.',
		fabricDetails: 'Premium Nida abaya with matching chiffon scarf included.',
		price: 12500,
		salePrice: 11250,
		images: [image('/ChatGPT Image May 25, 2026, 06_07_28 PM.png')],
		collections: ['nida-essentials', 'premium'],
		variants: [
			{ color: 'Charcoal', size: 'S (52)', sku: 'ABY-ZOYA-CHR-S', stockCount: 5 },
			{ color: 'Charcoal', size: 'M (54)', sku: 'ABY-ZOYA-CHR-M', stockCount: 6 },
			{ color: 'Charcoal', size: 'L (56)', sku: 'ABY-ZOYA-CHR-L', stockCount: 4 }
		]
	},
	{
		name: 'Emerald Layered Abaya',
		slug: 'emerald-layered-abaya',
		description:
			'Emerald layered abaya with airy chiffon movement and a composed evening silhouette.',
		fabricDetails: 'Layered chiffon with soft inner lining.',
		price: 10800,
		salePrice: 9720,
		images: ['/abaya22.png'],
		collections: ['layered', 'occasion'],
		variants: [
			{ color: 'Emerald', size: 'S (52)', sku: 'ABY-EMLYR-EMR-S', stockCount: 6 },
			{ color: 'Emerald', size: 'M (54)', sku: 'ABY-EMLYR-EMR-M', stockCount: 7 },
			{ color: 'Emerald', size: 'L (56)', sku: 'ABY-EMLYR-EMR-L', stockCount: 5 }
		]
	},
	{
		name: 'Midnight Veil Abaya',
		slug: 'midnight-veil-abaya',
		description:
			'Midnight veil abaya with refined contrast and light movement for signature modest dressing.',
		fabricDetails: 'Veil overlay with lined body and polished finishing.',
		price: 11800,
		salePrice: 10620,
		images: ['/abaya11.png'],
		collections: ['signature', 'premium'],
		variants: [
			{ color: 'Midnight', size: 'S (52)', sku: 'ABY-MIDVEIL-MID-S', stockCount: 5 },
			{ color: 'Midnight', size: 'M (54)', sku: 'ABY-MIDVEIL-MID-M', stockCount: 6 },
			{ color: 'Midnight', size: 'L (56)', sku: 'ABY-MIDVEIL-MID-L', stockCount: 4 }
		]
	},
	{
		name: 'Limited Eid Abaya',
		slug: 'limited-eid-abaya',
		description:
			'Limited edition Eid abaya with a graceful fall, soft sleeves, and polished festive detailing.',
		fabricDetails: 'Premium crepe blend with occasion-ready finishing.',
		price: 13200,
		salePrice: 11880,
		images: [image('/ChatGPT Image May 25, 2026, 06_25_13 PM.png')],
		collections: ['limited', 'occasion'],
		variants: [
			{ color: 'Ivory', size: 'S (52)', sku: 'ABY-LIMEID-IVR-S', stockCount: 4 },
			{ color: 'Ivory', size: 'M (54)', sku: 'ABY-LIMEID-IVR-M', stockCount: 5 },
			{ color: 'Ivory', size: 'L (56)', sku: 'ABY-LIMEID-IVR-L', stockCount: 3 }
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
