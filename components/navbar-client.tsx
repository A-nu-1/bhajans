"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import LoginButton from "./login-button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavbarClient({
  isAdmin,
}: {
  isAdmin: boolean;
}) {

  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <div className="w-full border-b px-4 py-3 flex items-center justify-between">

      {/* LEFT */}
      <Link href="/" className="font-bold text-lg">
        🕉 Bhajans
      </Link>

      {/* SEARCH */}
      <div className="flex gap-2 w-full max-w-md mx-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search bhajans..."
        />

        <Button
          onClick={() => {
            router.push(
              `/bhajans?search=${encodeURIComponent(query)}`
            );
          }}
        >
          Search
        </Button>
      </div>

      {/* RIGHT */}
      <div className="flex gap-2 items-center">

        {isAdmin && (
          <>
            <Link href="/admin/bhajans/new">
              <Button>+ Add</Button>
            </Link>

            <Link href="/admin/bhajans">
              <Button variant="outline">Admin</Button>
            </Link>

            <Link href="/admin/categories">
              <Button variant="outline">
                Categories
              </Button>
            </Link>
          </>
        )}

        <ThemeToggle />
        <LoginButton />
      </div>
    </div>
  );
}