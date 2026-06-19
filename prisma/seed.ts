// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   await prisma.admin.upsert({
//     where: {
//       email: "rajendra.anupama@gmail.com",
//     },
//     update: {},
//     create: {
//       email: "rajendra.anupama@gmail.com",
//     },
//   });

//   console.log("Admin seeded");
// }

// main()
//   .catch(console.error)
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    "Krishna",
    "Rama",
    "Shiva",    
    "Guru",    
    "Hanuman",
    "Ganesh", 
    "Durga",
    "Lakshmi",
    "Saraswati",
    "Sai Baba",
    "SangeetaClass",
    "Subbu",
    "Venkateshwara",
    "Yogeshwara",
    "Vishnu",
    "Others"
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}

main();