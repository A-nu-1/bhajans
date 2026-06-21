import { prisma } from "@/lib/prisma";
import NewBhajanForm from "./new-bhajan-form";
import { isAdmin } from "@/lib/is-admin";
import { redirect } from "next/navigation"; 

export default async function NewBhajanPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

   const admin = await isAdmin();
    if (!admin) {
      redirect("/bhajans");
    }

  return (
    <NewBhajanForm
      categories={categories}
    />
  );
}