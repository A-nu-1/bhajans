"use client";

import { Button } from "@/components/ui/button";

export default function DeleteCategoryButton({
  categoryId,
}: {
  categoryId: string;
}) {
  async function deleteCategory() {
    const confirmed = window.confirm(
      "Delete category?"
    );

    if (!confirmed) {
      return;
    }

    const res = await fetch(
      `/api/categories/${categoryId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      location.reload();
    }
  }

  return (
    <Button
      variant="destructive"
      onClick={deleteCategory}
    >
      Delete
    </Button>
  );
}