"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import LoginButton from "./login-button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from 'lucide-react';
import Image from "next/image";
import { ShieldUser } from 'lucide-react';
import {  DropdownMenu,  DropdownMenuContent,  DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";


type NavbarClientProps = {
  isAdmin: boolean;
  session: any;
};

export default function NavbarClient({
  isAdmin,
  session,
}: NavbarClientProps) {

  const [query, setQuery] = useState("");
  const router = useRouter();
 

  const handleSearch = () => {
    const basePath = isAdmin ? "/admin/bhajans" : "/bhajans";
    router.push(`${basePath}?search=${encodeURIComponent(query)}`);
    setQuery("")
  };
  return (
    <div className="w-full border-b px-4 py-3 flex items-center justify-between bg-linear-to-t from-(--bg1) to-(--bg2) ">

      {/* LEFT */}
      <div className="flex items-center">
        <Link href="/"><Image src="/bhajanlogo.avif" alt="Bhajans" width={32} height={32} className="rounded-full min-w-9 min-h-9" /></Link>
        {isAdmin && (<p className="bg-linear-to-r from-purple-400 to-red-400 bg-clip-text text-xl p-2 font-bold text-transparent">{session && session.user?.name?.slice(0,3)}</p>)}
      </div>
      {/* SEARCH */}
      <div className="flex  w-full max-w-2xl mx-4 rounded-3xl border bg-background shadow-sm focus-within:border-secondary">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search bhajans..."
          className="flex-1 bg-transparent border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onKeyDown={(e) => { if (e.key === "Enter") { handleSearch(); } }} />

        <Button className="rounded-3xl" variant="secondary" onClick={handleSearch}><Search /></Button>
      </div>

      {/* RIGHT */}
      <div className="flex gap-2 items-center">

        {isAdmin && (
          <div className="hidden sm:flex gap-1">
            <Link href="/admin/bhajans/new"><Button variant="outline">+ Add</Button></Link>
            <Link href="/admin/bhajans"><Button variant="outline">View Admin </Button></Link>
            <Link href="/bhajans"><Button variant="outline">View Reader </Button></Link>
            <Link href="/admin/categories"><Button variant="outline">Categories</Button></Link>
          </div>
        )}

        <ThemeToggle />


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 text-2xl hover:scale-110 hover:bg-transparent border-0 focus:bg-transparent active:bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0">
              <ShieldUser className="rounded-full stroke-[1px] min-w-6 min-h-6" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="flex flex-col items-center  gap-1 p-1 m-1">
            <Link href="/admin/bhajans/new"><Button variant="outline">+ Add</Button></Link>
            <Link href="/admin/bhajans"><Button variant="outline">View Admin </Button></Link>
            <Link href="/bhajans"><Button variant="outline">View Reader </Button></Link>
            <Link href="/admin/categories"><Button variant="outline">Categories</Button></Link>
            <LoginButton  />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}