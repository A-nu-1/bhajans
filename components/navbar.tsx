"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import LoginButton from "./login-button";
import { useSession } from "next-auth/react";

export default function Navbar() {

  const {data: session} = useSession();

   const isAdmin = !!session?.user?.email; 
 
  return (
    <div className="w-full border-b px-4 py-3 flex items-center justify-between">
      
      {/* LEFT */}
      <Link href="/" className="font-bold text-lg">
        🕉 Bhajans
      </Link>

      {/* CENTER SEARCH */}
      <div className="flex gap-2 w-full max-w-md mx-4">
        <Input placeholder="Search bhajans..." />
        <Button>Search</Button>
      </div>

      {/* RIGHT */}
      <div className="flex gap-2">
        {isAdmin && (
          <>
            <Link href="/admin/bhajans/new">
              <Button>+ Add</Button>
            </Link>

            <Link href="/admin/bhajans">
              <Button variant="outline">Admin</Button>
            </Link>
          </>
        )}


        <ThemeToggle />

        <Button variant="ghost">
          🎨
        </Button>
        <LoginButton />
      </div>
    </div>
  );
}