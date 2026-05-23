import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding data...')

  // 1. Create Collections
  const collections = await Promise.all([
    prisma.collection.upsert({
      where: { slug: 'everyday-edit' },
      update: {},
      create: {
        name: 'Everyday Edit',
        slug: 'everyday-edit',
        description: 'Effortless elegance for every day',
        imageUrl: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=800&auto=format&fit=crop',
        displayOrder: 1,
      },
    }),
    prisma.collection.upsert({
      where: { slug: 'occasion-wear' },
      update: {},
      create: {
        name: 'Occasion Wear',
        slug: 'occasion-wear',
        description: 'Dressed for every celebration',
        imageUrl: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop',
        displayOrder: 2,
      },
    }),
    prisma.collection.upsert({
      where: { slug: 'evening-luxe' },
      update: {},
      create: {
        name: 'Evening Luxe',
        slug: 'evening-luxe',
        description: 'After-dark opulence, redefined',
        imageUrl: 'https://images.unsplash.com/photo-1627589255655-b40b8a3f8737?q=80&w=800&auto=format&fit=crop',
        displayOrder: 3,
      },
    }),
    prisma.collection.upsert({
      where: { slug: 'summer-breeze' },
      update: {},
      create: {
        name: 'Summer Breeze',
        slug: 'summer-breeze',
        description: 'Light fabrics for warm days',
        imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop',
        displayOrder: 4,
      },
    }),
  ])

  console.log('Collections seeded')

  // 2. Create Products
  const products = [
    {
      name: 'Signature Nida Abaya',
      slug: 'signature-nida-abaya',
      description: 'Our bestselling everyday abaya crafted from premium Korean Nida fabric. Features a relaxed A-line silhouette, hidden side pockets, and discreet front zip closure perfect for nursing mothers. The luxurious drape and breathable material make it an essential wardrobe staple.',
      fabricDetails: '100% Premium Korean Nida. Lightweight, opaque, and wrinkle-resistant.',
      price: 145.00,
      salePrice: null,
      images: ['https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=800&auto=format&fit=crop'],
      collections: ['everyday-edit'],
      variants: [
        { color: 'Midnight Black', size: 'M (54)', sku: 'SNA-BLK-M', stockCount: 15 },
        { color: 'Midnight Black', size: 'L (56)', sku: 'SNA-BLK-L', stockCount: 10 },
      ]
    },
    {
      name: 'Pearl Embellished Open Abaya',
      slug: 'pearl-embellished-open-abaya',
      description: 'Elevate your evening wear with this exquisite open abaya. Hand-placed pearl embellishments cascade down the front panels and sleeves. Cut from fluid chiffon and fully lined, it moves beautifully as you walk. Includes a matching chiffon hijab and structured inner slip dress.',
      fabricDetails: 'Premium Chiffon Outer, Crepe Inner. Hand-stitched pearl detailing.',
      price: 220.00,
      salePrice: null,
      images: ['https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=800&auto=format&fit=crop', 'https://images.unsplash.com/photo-1617251137884-f135eccf6942?q=80&w=800&auto=format&fit=crop'],
      collections: ['occasion-wear', 'evening-luxe'],
      variants: [
        { color: 'Ivory White', size: 'S (52)', sku: 'PEO-IVR-S', stockCount: 5 },
        { color: 'Ivory White', size: 'M (54)', sku: 'PEO-IVR-M', stockCount: 8 },
        { color: 'Dusty Rose', size: 'M (54)', sku: 'PEO-ROS-M', stockCount: 4 },
      ]
    },
    {
      name: 'Chiffon Layered Abaya',
      slug: 'chiffon-layered-abaya',
      description: 'A beautiful layered abaya perfect for warmer days.',
      fabricDetails: 'Premium Chiffon.',
      price: 165.00,
      salePrice: null,
      images: ['https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800&auto=format&fit=crop'],
      collections: ['summer-breeze'],
      variants: [
        { color: 'Sand', size: 'M (54)', sku: 'CLA-SND-M', stockCount: 12 },
      ]
    },
    {
      name: 'Velvet Trim Evening Abaya',
      slug: 'velvet-trim-evening-abaya',
      description: 'Luxurious evening abaya with velvet trim details.',
      fabricDetails: 'Crepe with Velvet trim.',
      price: 185.00,
      salePrice: null,
      images: ['https://images.unsplash.com/photo-1627589255655-b40b8a3f8737?q=80&w=800&auto=format&fit=crop'],
      collections: ['evening-luxe'],
      variants: [
        { color: 'Navy', size: 'L (56)', sku: 'VTE-NVY-L', stockCount: 6 },
      ]
    }
  ]

  for (const prod of products) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        fabricDetails: prod.fabricDetails,
        price: prod.price,
        salePrice: prod.salePrice,
        images: {
          create: prod.images.map((url, i) => ({
            url,
            displayOrder: i
          }))
        },
        variants: {
          create: prod.variants
        },
        collections: {
          connect: prod.collections.map(slug => ({ slug }))
        }
      }
    })
    console.log(`Created product: ${createdProduct.name}`)
  }

  // 3. Admin user
  await prisma.user.upsert({
    where: { email: 'admin@abayiza.com' },
    update: {},
    create: {
      email: 'admin@abayiza.com',
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
    }
  })

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
