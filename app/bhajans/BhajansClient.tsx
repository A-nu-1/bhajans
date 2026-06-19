"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFavorites } from "@/lib/favorites";

type Bhajan = {
  id: string;
  title: string;
  titleEnglish: string | null;
  categories: { id: string; name: string }[];
};

export default function BhajansClient({
  initialResults,
}: {
  initialResults: Bhajan[];
}) {
  const [mode, setMode] = useState<"all" | "favorites">("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());

    const sync = () => setFavorites(getFavorites());
    window.addEventListener("focus", sync);

    return () => window.removeEventListener("focus", sync);
  }, []);

  const filtered =
    mode === "favorites"
      ? initialResults.filter((b) => favorites.includes(b.id))
      : initialResults;

  return (
    <div className="space-y-4">

      {/* DEBUG (optional) */}
      <div className="text-xs text-gray-500">
        Mode: {mode} | Favorites: {favorites.length}
      </div>

      {/* ⭐ MODE TOGGLE BAR (THIS WAS MISSING) */}
      <div className="flex gap-3 border-b pb-2">
        <button
          onClick={() => setMode("all")}
          className={`px-3 py-1 border rounded ${
            mode === "all" ? "bg-black text-white" : ""
          }`}
        >
          All
        </button>

        <button
          onClick={() => setMode("favorites")}
          className={`px-3 py-1 border rounded ${
            mode === "favorites" ? "bg-black text-white" : ""
          }`}
        >
          ⭐ Favorites
        </button>
      </div>

      {/* LIST */}
      {filtered.map((b) => (
        <Link
          key={b.id}
          href={`/bhajans/${b.id}`}
          className="block p-3 border rounded-md hover:bg-muted"
        >
          <div className="font-medium">
            {favorites.includes(b.id) ? "❤️ " : ""}
            {b.title}
          </div>
        </Link>
      ))}

      {/* EMPTY STATE */}
      {mode === "favorites" && filtered.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No favorites yet ❤️
        </p>
      )}
    </div>
  );
}