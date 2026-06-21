"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DeleteCategoryButton from "./delete-category-button";

export default function CategoryRow({
  category,
}: {
  category: {
    id: string;
    name: string;
    image: string | null;
  };
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [file, setFile] = useState<File | null>(null);

  async function save() {
    const formData = new FormData();

    formData.append("name", name);

    if (file) {
      formData.append("image", file);
    }

    const res = await fetch(
      `/api/categories/${category.id}`,
      {
        method: "PATCH",
        body: formData,
      }
    );

    if (res.ok) {
      location.reload();
    }
  }

  return (
    <div className="flex justify-between items-center border rounded p-3">

      <div className="flex items-center gap-3">

        {category.image && (
          <img
            src={category.image ? `/${category.image}` : "/gn.jpg"}
            className="w-8 h-8 sm:w-11 sm:h-11 rounded-full object-cover shrink-0"
          />
        )}

        {editing ? (
          <Input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        ) : (
          <span>{category.name}</span>
        )}
      </div>

      <div className="flex gap-2 items-center">

        {editing && (
          <label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setFile(
                  e.target.files?.[0] || null
                )
              }
            />

            <Button
              type="button"
              variant="outline"
              asChild
            >
              <span>
                {file
                  ? file.name
                  : "📷 Change"}
              </span>
            </Button>
          </label>
        )}

        {editing ? (
          <>
            <Button onClick={save}>
              Save
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                setEditing(false)
              }
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={() =>
              setEditing(true)
            }
          >
            Edit
          </Button>
        )}

        <DeleteCategoryButton
          categoryId={category.id}
        />
      </div>
    </div>
  );
}