import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Maximize, Database ,SmilePlus  } from 'lucide-react';
import { isAdmin } from "@/lib/is-admin";
import { redirect } from "next/navigation"; 

export default async function BhajanListPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {

 const admin = await isAdmin();
  if (!admin) {
    redirect("/bhajans");
  }

  const { search } = await searchParams;

  const bhajans = await prisma.bhajan.findMany({
    where: search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              titleEnglish: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              mainText: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
    orderBy: {
      createdAt: "desc",
    },
    include: {
      paragraphs: true,
    },
  });

  return (
    <div className="lg:min-w-5xl md:min-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mx-3">
        <Database/>
        <h1 className="text-2xl font-bold">All Bhajans</h1>
        <Link href="/admin/bhajans/new"><SmilePlus /></Link>
      </div>

      {bhajans.length === 0 ? (
        <p>No bhajans yet</p>
      ) : (
        bhajans.map((b) => (
          
            
            <Card className="hover:shadow-md transition cursor-pointer my-3">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{b.title.length > 20? b.title.slice(0, 20) + "...": b.title} // {b.titleEnglish && b.titleEnglish.length > 20? b.titleEnglish.slice(0, 20) + "...": b.titleEnglish}</CardTitle>
                <Link key={b.id} href={`/admin/bhajans/${b.id}`}><Maximize className="h-5"/></Link>            
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-sm ">{b.description && b.description.length > 50 ? b.description?.slice(0,50) + "...":b.description}</p>
                <p className="text-sm "> {b.mainText.length > 50? b.mainText.slice(0, 50) + "...": b.mainText}</p>                
                <p className="text-xs ">Paragraphs: {b.paragraphs.length}</p>
              </CardContent>
            </Card>
          
        ))
      )}
    </div>
  );
}