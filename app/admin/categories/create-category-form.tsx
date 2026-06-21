"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateCategoryForm() {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  

  async function createCategory() {
    if (!name.trim()) return;

    const formData = new FormData();
    formData.append("name", name);

    if (file) {
      formData.append("image", file);
    }

    const res = await fetch("/api/categories", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      location.reload();
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New category"
      />

      <label>
  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) =>
      setFile(e.target.files?.[0] || null)
    }
  />

  <Button
    type="button"
    variant="outline"
    asChild
  >
    <span>
      {file ? file.name : "📷 Image"}
    </span>
  </Button>
</label>

      <Button variant="outline" onClick={createCategory}>
        Add
      </Button>
    </div>
  );
}