import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/is-admin";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const admin = await isAdmin();

  if (!admin) {
    return NextResponse.json({}, { status: 401 });
  }

  const formData = await req.formData();

  const name = formData.get("name") as string;
  const file = formData.get("image") as File | null;

  let imageName: string | null = null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    imageName = `${Date.now()}-${file.name}`;

    await writeFile(
      path.join(process.cwd(), "public", imageName),
      buffer
    );
  }

  await prisma.category.create({
    data: {
      name,
      image: imageName,
    },
  });

  return NextResponse.json({ success: true });
}