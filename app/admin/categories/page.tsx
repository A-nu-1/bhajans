import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/is-admin";
import { redirect } from "next/navigation";

import CreateCategoryForm from "./create-category-form";
import CategoryRow from "./category-row";

export default async function CategoriesPage() {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/");
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold">
        Categories
      </h1>

      <CreateCategoryForm />

      <div className="space-y-2">
        {categories.map((category) => (
          <CategoryRow
  key={category.id}
  category={category}
/>
        ))}
      </div>

    </div>
  );
}