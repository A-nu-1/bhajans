import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json([]);
  }

  const results = await prisma.bhajan.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          titleEnglish: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          mainText: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      titleEnglish: true,
    },
    take: 20,
  });

  return NextResponse.json(results);
}