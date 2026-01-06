import {prisma} from "../src/lib/prisma"

async function main() {
  const countries = [
    { code: "IN", name: "India" },
    { code: "PK", name: "Pakistan" },
    { code: "BD", name: "Bangladesh" },
    { code: "NP", name: "Nepal" },
    { code: "CN", name: "China" },
    { code: "LK", name: "Sri Lanka" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "ZZ", name: "Unknown" },
  ];

  await prisma.country.createMany({
    data: countries,
    skipDuplicates: true,
  });

  console.log("✅ Countries seeded successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
