import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  const count = await prisma.bhajan.count();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">🙏 Bhajan App</h1>

      <Card>
        <CardHeader>
          <CardTitle>Total Bhajans</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{count}</p>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Link href="/admin/bhajans">
          <Button>View Bhajans</Button>
        </Link>

        <Link href="/admin/bhajans/new">
          <Button variant="secondary">+ Create Bhajan</Button>
        </Link>
      </div>
    </div>
  );
}