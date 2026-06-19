"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateCategoryForm() {
  const [name, setName] = useState("");

  async function createCategory() {
    if (!name.trim()) {
      return;
    }

    const res = await fetch(
      "/api/categories",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      }
    );

    if (res.ok) {
      location.reload();
    }
  }

  return (
    <div className="flex gap-2">

      <Input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="New category"
      />

      <Button onClick={createCategory}>
        Add
      </Button>

    </div>
  );
}