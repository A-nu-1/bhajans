import { prisma } from "@/lib/prisma";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { BhajanParagraph } from "@/types/bhajans";

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

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: bhajan.title,
                bold: true,
                size: 32,
              }),
            ],
          }),

          new Paragraph(bhajan.mainText),

          ...bhajan.paragraphs.map((p: BhajanParagraph) =>
  new Paragraph({
    text: p.text,
  })

          ),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

 const safeName = bhajan.title
  .replace(/[^a-zA-Z0-9\s]/g, "")
  .replace(/\s+/g, "_");

return new Response(new Uint8Array(buffer), {
  headers: {
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "Content-Disposition": `attachment; filename="${safeName}.docx"`,
  },
});
}