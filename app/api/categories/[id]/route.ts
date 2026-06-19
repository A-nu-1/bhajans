import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/is-admin";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const admin = await isAdmin();

  if (!admin) {
    return NextResponse.json(
      {},
      { status: 401 }
    );
  }

  const { id } = await params;

 await prisma.$transaction([
  prisma.category.update({
    where: { id },
    data: {
      bhajans: {
        set: [],
      },
    },
  }),

  prisma.category.delete({
    where: { id },
  }),
]);

  return NextResponse.json({
    success: true,
  });
}