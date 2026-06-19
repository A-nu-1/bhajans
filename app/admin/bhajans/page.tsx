import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function BhajanListPage() {
  const bhajans = await prisma.bhajan.findMany({
    orderBy: { createdAt: "desc" },
    include: { paragraphs: true },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Bhajans</h1>

        <Link href="/admin/bhajans/new">
          <Button>+ New Bhajan</Button>
        </Link>
      </div>

      {bhajans.length === 0 ? (
        <p className="text-gray-500">No bhajans yet</p>
      ) : (
        bhajans.map((b) => (
          <Link key={b.id} href={`/admin/bhajans/${b.id}`}>
            <Card className="hover:shadow-md transition cursor-pointer">
              <CardHeader>
                <CardTitle>{b.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">{b.mainText}</p>
                <p className="text-xs text-gray-400">
                  Paragraphs: {b.paragraphs.length}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}