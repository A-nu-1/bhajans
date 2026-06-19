import { prisma } from "@/lib/prisma";
import NewBhajanForm from "./new-bhajan-form";

export default async function NewBhajanPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <NewBhajanForm
      categories={categories}
    />
  );
}