"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DeleteBhajanButton({
  bhajanId,
}: {
  bhajanId: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bhajan?"
    );

    if (!confirmed) {
      return;
    }

    const res = await fetch(
      `/api/bhajans/${bhajanId}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      router.push("/admin/bhajans");
      router.refresh();
    } else {
      alert("Delete failed");
    }
  }

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}