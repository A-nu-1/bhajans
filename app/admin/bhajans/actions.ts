"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/is-admin";

export async function createBhajan(formData: FormData) {
  const title = formData.get("title") as string;
  const titleEnglish = formData.get("titleEnglish") as string;
  const language = formData.get("language") as string;
  const mainText = formData.get("mainText") as string;
  const mediaUrl = formData.get("mediaUrl") as string;
  const description = formData.get("description") as string;
 



  const paragraphsRaw = formData.get("paragraphs") as string;

  const paragraphs = JSON.parse(paragraphsRaw || "[]") as string[];

  const admin = await isAdmin();
  if (!admin) {
    redirect("/");
  }
  const categoryIds =
  formData.getAll("categories") as string[];

  const bhajan = await prisma.bhajan.create({
    data: {
      title,
      titleEnglish,
      language,
      mainText,

  

      mediaUrl: mediaUrl || null,
      description: description || null,
     categories: {
  connect: categoryIds.map((id) => ({
    id,
  })),
},

      paragraphs: {
        create: paragraphs.map((text, index) => ({
          text,
          orderNo: index + 1,
        })),
      },
    },
  });

  redirect(`/admin/bhajans/${bhajan.id}`);
}

export async function updateBhajan(
  formData: FormData
) {

  const admin = await isAdmin();

if (!admin) {
  redirect("/");
}
  const title = formData.get("title") as string;
const titleEnglish = formData.get("titleEnglish") as string;
const language = formData.get("language") as string;
const mainText = formData.get("mainText") as string;
const mediaUrl = formData.get("mediaUrl") as string;
const description = formData.get("description") as string;
  const id = formData.get("id") as string;

const categoryIds =
  formData.getAll("categories") as string[];

const paragraphsRaw =
  formData.get("paragraphs") as string;

const paragraphs = JSON.parse(
  paragraphsRaw
) as string[];

await prisma.bhajan.update({
  where: {
    id,
  },

  data: {
    title,
    titleEnglish,
    language,
    mainText,
  mediaUrl: mediaUrl || null,
description: description || null,

    categories: {
      set: [],
      connect: categoryIds.map(
        (id) => ({
          id,
        })
      ),
    },
  },
});

await prisma.bhajanParagraph.deleteMany({
  where: {
    bhajanId: id,
  },
});

await prisma.bhajanParagraph.createMany({
  data: paragraphs.map(
    (text, index) => ({
      bhajanId: id,
      text,
      orderNo: index + 1,
    })
  ),
});

redirect(`/admin/bhajans/${id}`);
}