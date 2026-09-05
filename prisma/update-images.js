const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const images = {
    "soundmax-pro":
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    "bassbeat-lite":
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    "audioguard-case":
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
    "techsound-40":
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    "studybuds-x":
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    "laptop-sleeve-15":
      "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
    "powersound-50":
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    pocketbuds:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    "usb-c-fast-charger":
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0",
    "probook-15-laptop":
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  };

  for (const [slug, imageUrl] of Object.entries(images)) {
    await prisma.product.update({
      where: { slug },
      data: { imageUrl },
    });
  }

  console.log("Product images updated successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });