import { prisma } from "@/lib/prisma";
import BhajansClient from "./BhajansClient";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function BhajansPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}) {
  const { search, category } = await searchParams;
 

 const categories = await prisma.category.findMany({
  orderBy: { name: "asc" },
  include: {
    _count: {
      select: {
        bhajans: true, // IMPORTANT: relation name
      },
    },
  },
});


 const bhajans = await prisma.bhajan.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { titleEnglish: { contains: search, mode: "insensitive" } },
                { mainText: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},

        category
          ? {
              categories: {
                some: { name: category },
              },
            }
          : {},
      ],
    },
    include: { categories: true },
    orderBy: { title: "asc" },
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/bhajans">
          <Button variant={!category ? "default" : "outline"}>
            All
          </Button>
        </Link>

        {categories.map((cat) => (
          <Link key={cat.id} href={`/bhajans?category=${cat.name}`}>
            <Button
              variant={category === cat.name ? "default" : "outline"}
            >
              {cat.name}{" "}
      <span className="ml-2 text-xs opacity-70">
        ({cat._count.bhajans})
      </span>
            </Button>
          </Link>
        ))}
      </div>

      {/* CLIENT LIST (favorites live here now) */}
      <BhajansClient initialResults={bhajans} />
    </div>
  );
}