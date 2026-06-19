import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/is-admin";

export async function POST(
  req: Request
) {
  const admin = await isAdmin();

  if (!admin) {
    return NextResponse.json(
      {},
      { status: 401 }
    );
  }

  const body = await req.json();

  await prisma.category.create({
    data: {
      name: body.name,
    },
  });

  return NextResponse.json({
    success: true,
  });
}