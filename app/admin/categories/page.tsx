import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/is-admin";
import { redirect } from "next/navigation";

import CreateCategoryForm from "./create-category-form";
import DeleteCategoryButton from "./delete-category-button";

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
          <div
            key={category.id}
            className="flex justify-between items-center border rounded p-3"
          >
            <span>{category.name}</span>

            <DeleteCategoryButton
              categoryId={category.id}
            />
          </div>
        ))}
      </div>

    </div>
  );
}