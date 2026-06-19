import { prisma } from "@/lib/prisma";
import ReaderClient from "./reader-client";
import { BhajanParagraph } from "@/types/bhajans";

export default async function BhajanReaderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const bhajan = await prisma.bhajan.findUnique({
    where: { id },
    include: { paragraphs: true,  categories: true },
  });

  if (!bhajan) return <div>Not found</div>;

  const paragraphs = bhajan.paragraphs.sort(
    (a : BhajanParagraph, b : BhajanParagraph) => a.orderNo - b.orderNo
  );

  return (
    <ReaderClient bhajan={bhajan} paragraphs={paragraphs} />
  );
}