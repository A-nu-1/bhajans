import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/is-admin";

export async function PUT(
  req: Request,
  { params }: { params:Promise<{ id: string }>  }
) {
  // 🔐 SECURITY CHECK (VERY IMPORTANT)
  const admin = await isAdmin();

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  const { id } = await params;

  const body = await req.json();

 const {
  title,
  titleEnglish,
  language,
  mainText,
  description,
  mediaUrl,
  paragraphs,
  categoryIds,
} = body;

  await prisma.bhajan.update({
    where: { id },
    data: {
      title,
      titleEnglish,
      language,
      mainText,
      description,
      mediaUrl,

      categories: {
  set: [],
  connect: categoryIds.map(
    (id: string) => ({
      id,
    })
  ),
},

      // 🧠 IMPORTANT: replace old paragraphs safely
      paragraphs: {
        deleteMany: {},   // remove old ones
        create: paragraphs.map((text: string, i: number) => ({
          text,
          orderNo: i + 1,
        })),
      },
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await isAdmin();

  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  await prisma.bhajan.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
  });
}