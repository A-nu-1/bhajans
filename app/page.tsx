import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default async function Home() {
  const count = await prisma.bhajan.count();

  return (
    <div className="max-w-5xl w-full mx-auto p-6 space-y-6">

       <h1 className="text-3xl font-bold text-center">🙏 Bhajan App🙏</h1>

      <Card className="w-full text-center">
        <CardHeader>
          <CardTitle>Total Bhajans</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{count}</p>
        </CardContent>
      </Card>

      
        <Link href="/admin/bhajans">
          <Button className="w-full" variant="outline">View Bhajans</Button>
        </Link>
  
    </div>
  );
}