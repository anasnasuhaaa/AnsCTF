import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const admin =
    await prisma.user.findFirst({
      where: {
        role: "ADMIN",
      },
    });

  if (!admin) {
    console.log(
      "Create admin first"
    );
    return;
  }

  const crypto =
    await prisma.category.upsert({
      where: {
        name: "Crypto",
      },
      update: {},
      create: {
        name: "Crypto",
      },
    });

  const reverse =
    await prisma.category.upsert({
      where: {
        name: "Reverse",
      },
      update: {},
      create: {
        name: "Reverse",
      },
    });

  await prisma.challenge.createMany({
    data: [
      {
        title: "Easy Crypto",
        description:
          "Decode the secret message.",
        points: 100,
        flag: "AnsCTF{crypto_easy}",
        categoryId: crypto.id,
        authorId: admin.id,
      },

      {
        title: "Simple Reverse",
        description:
          "Find the hidden number.",
        points: 150,
        flag: "AnsCTF{reverse_fun}",
        categoryId: reverse.id,
        authorId: admin.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed complete");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });