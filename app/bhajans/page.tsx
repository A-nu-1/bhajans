import { prisma } from "@/lib/prisma";
import BhajansClient from "./BhajansClient";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function BhajansPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}) {
  const { search, category } = await searchParams;
  const totalBhajans = await prisma.bhajan.count();


  const categories = await prisma.category.findMany({
    orderBy: [
      {
        bhajans: {
          _count: "desc",
        },
      },
      {
        name: "asc",
      },
    ],
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

      <div className="flex gap-6 overflow-x-auto pb-4 mb-6 hide-scrollbar">

        {/* ALL */}
        <Link
          href="/bhajans"
          className="flex flex-col items-center min-w-[90px]"
        >
          <div
            className={`w-10 h-10 rounded-full border-2 overflow-hidden transition hover:scale-105 hover:shadow-lg flex items-center justify-center text-2xl
      ${!category
                ? "border-primary ring-2 ring-primary/30"
                : "border-muted"
              }`}
          >
            🕉
          </div>

          <span className="mt-2 font-medium">
            All
          </span>

          <span className="text-xs text-muted-foreground">
            {totalBhajans}
          </span>
        </Link>

        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/bhajans?category=${cat.name}`}
            className="flex flex-col items-center min-w-[90px]"
          >
            <div
              className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition hover:scale-105 hover:shadow-lg
        ${category === cat.name
                  ? "border-primary ring-4 ring-primary/20 scale-105"
                  : "border-muted"
                }`}
            >
              <Image
                src={cat.image ? `/${cat.image}` : "/gn.jpg"}
                alt={cat.name}
                width={64}
                height={64}
                className="object-cover w-10 h-10"
              />
            </div>

            <span className="mt-2 text-sm font-medium text-center whitespace-nowrap">
              {cat.name}
            </span>

            <span className="text-xs text-muted-foreground">
              {cat._count.bhajans}
            </span>
          </Link>
        ))}
      </div>

      {/* CLIENT LIST (favorites live here now) */}
      <BhajansClient initialResults={bhajans} />
    </div>
  );
}