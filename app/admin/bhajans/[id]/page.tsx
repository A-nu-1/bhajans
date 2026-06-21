import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/is-admin";
import { Button } from "@/components/ui/button";
import DeleteBhajanButton from "@/components/delete-bhajan-button";

import { redirect } from "next/navigation"; 

export default async function BhajanDetailPage({
  params,
}: {
   params: Promise<{ id: string }>;
}) {

    const admin = await isAdmin();
  
    if (!admin) {
      redirect("/bhajans");
    }
    
  const { id } = await params;

  const bhajan = await prisma.bhajan.findUnique({
    where: { id },
    include: { paragraphs: true },
  });

  if (!bhajan) {
    return <div>Bhajan not found</div>;
  }



  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{bhajan.title}</h1>
          <p className="text-sm text-muted-foreground">
            {bhajan.titleEnglish}
          </p>
        </div>

        {/* ✅ EDIT BUTTON ONLY FOR ADMINS */}
       {admin && (
  <div className="flex gap-2">
    <Link href={`/admin/bhajans/${bhajan.id}/edit`}>
      <Button>Edit</Button>
    </Link>

    <DeleteBhajanButton
      bhajanId={bhajan.id}
    />
  </div>
)}
      </div>

      {/* MAIN TEXT */}
      <div className="p-4 border rounded-md">
        <p className="whitespace-pre-line">{bhajan.mainText}</p>
      </div>

      {/* PARAGRAPHS */}
      <div className="space-y-3">
        {bhajan.paragraphs
          .sort((a, b) => a.orderNo - b.orderNo)
          .map((p) => (
            <div key={p.id} className="p-3 border rounded-md">
              {p.text}
            </div>
          ))}
      </div>

    </div>
  );
}