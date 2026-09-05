const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Creating SafeShop AI demo data...");

  // Clear existing demo data
  await prisma.purchaseHistory.deleteMany();
  await prisma.userPreference.deleteMany();
  await prisma.product.deleteMany();
  await prisma.merchant.deleteMany();
  await prisma.user.deleteMany();

  // Merchants
  const audioHub = await prisma.merchant.create({
    data: {
      name: "AudioHub",
      slug: "audiohub",
      description: "Headphones and audio products for students and everyday users.",
    },
  });

  const techWorld = await prisma.merchant.create({
    data: {
      name: "TechWorld",
      slug: "techworld",
      description: "Affordable technology and accessories.",
    },
  });

  const quickKart = await prisma.merchant.create({
    data: {
      name: "QuickKart",
      slug: "quickkart",
      description: "Everyday electronics and smart accessories.",
    },
  });

  // Products
  await prisma.product.createMany({
    data: [
      {
        merchantId: audioHub.id,
        name: "SoundMax Pro",
        slug: "soundmax-pro",
        description:
          "Wireless over-ear headphones with excellent battery life and comfortable ear cushions.",
        category: "headphones",
        priceInPaise: 249900,
        stockQuantity: 25,
        tags: "wireless,bluetooth,long-battery,student,headphones",
        relatedProducts: "3",
      },
      {
        merchantId: audioHub.id,
        name: "BassBeat Lite",
        slug: "bassbeat-lite",
        description:
          "Lightweight wireless headphones with strong bass and good battery life.",
        category: "headphones",
        priceInPaise: 179900,
        stockQuantity: 40,
        tags: "wireless,bluetooth,bass,lightweight,student,headphones",
      },
      {
        merchantId: audioHub.id,
        name: "AudioGuard Case",
        slug: "audioguard-case",
        description: "Protective carrying case for headphones.",
        category: "accessories",
        priceInPaise: 39900,
        stockQuantity: 50,
        tags: "case,protection,headphones,accessory",
      },

      {
        merchantId: techWorld.id,
        name: "TechSound 40",
        slug: "techsound-40",
        description:
          "Bluetooth headphones with up to 40 hours of battery life.",
        category: "headphones",
        priceInPaise: 269900,
        stockQuantity: 18,
        tags: "wireless,bluetooth,40-hours,long-battery,headphones",
      },
      {
        merchantId: techWorld.id,
        name: "StudyBuds X",
        slug: "studybuds-x",
        description:
          "Compact wireless earbuds designed for studying and online classes.",
        category: "earbuds",
        priceInPaise: 199900,
        stockQuantity: 35,
        tags: "wireless,bluetooth,students,study,earbuds",
      },
      {
        merchantId: techWorld.id,
        name: "Laptop Sleeve 15",
        slug: "laptop-sleeve-15",
        description: "Protective sleeve suitable for 15-inch laptops.",
        category: "accessories",
        priceInPaise: 69900,
        stockQuantity: 30,
        tags: "laptop,protection,sleeve,student",
      },

      {
        merchantId: quickKart.id,
        name: "PowerSound 50",
        slug: "powersound-50",
        description:
          "Wireless headphones offering up to 50 hours of battery life.",
        category: "headphones",
        priceInPaise: 289900,
        stockQuantity: 12,
        tags: "wireless,bluetooth,50-hours,long-battery,headphones",
      },
      {
        merchantId: quickKart.id,
        name: "PocketBuds",
        slug: "pocketbuds",
        description:
          "Affordable Bluetooth earbuds with a compact charging case.",
        category: "earbuds",
        priceInPaise: 129900,
        stockQuantity: 45,
        tags: "wireless,bluetooth,affordable,earbuds",
      },
      {
        merchantId: quickKart.id,
        name: "USB-C Fast Charger",
        slug: "usb-c-fast-charger",
        description:
          "Compact USB-C fast charger for phones, tablets and compatible devices.",
        category: "chargers",
        priceInPaise: 89900,
        stockQuantity: 60,
        tags: "charger,usb-c,fast-charging,accessory",
      },
      {
        merchantId: techWorld.id,
        name: "ProBook 15 Laptop",
        slug: "probook-15-laptop",
        description:
          "15-inch laptop designed for students, productivity and everyday computing.",
        category: "laptops",
        priceInPaise: 4500000,
        stockQuantity: 5,
        tags: "laptop,student,productivity,computer",
      },
    ],
  });
// Demo user
await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@safeshop.ai",
      preferences: {
        create: [
          {
            preferenceKey: "typical_budget",
            preferenceValue: "3000",
          },
          {
            preferenceKey: "shopping_style",
            preferenceValue: "value_for_money",
          },
        ],
      },
      wallet: {
        create: {
          balanceInPaise: 500000,
          currency: "INR",
        },
      },
    },
  });
  
  console.log("SafeShop AI demo data created successfully!");
  }
  main()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  