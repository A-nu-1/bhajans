import { prisma } from "@/lib/prisma";
import { BhajanParagraph as Paragraph } from "@/types/bhajans";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const bhajan = await prisma.bhajan.findUnique({
    where: { id },
    include: { paragraphs: true },
  });

  if (!bhajan) {
    return new Response("Not found", { status: 404 });
  }

  const content = `
${bhajan.title}

${bhajan.mainText}

${bhajan.paragraphs
  .sort(
    (a: Paragraph, b: Paragraph) =>
      a.orderNo - b.orderNo
  )
  .map((p: Paragraph) => p.text)
  .join("\n\n")}
 
`;

  // 🧠 SAFE FILENAME (IMPORTANT FIX)
  const safeName = bhajan.title
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 50);

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safeName}.txt"`,
    },
  });
}