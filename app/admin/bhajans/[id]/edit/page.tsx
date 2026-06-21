import { prisma } from "@/lib/prisma";
import EditBhajanForm from "./edit-bhajan-form";
import { isAdmin } from "@/lib/is-admin";
import { redirect } from "next/navigation"; 

export default async function EditBhajanPage({
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
    include: {
      paragraphs: {
        orderBy: {
          orderNo: "asc",
        },
      },
      categories: true,
    },
  });

  if (!bhajan) {
    return <div>Bhajan not found</div>;
  }

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <EditBhajanForm
      bhajan={bhajan}
      categories={categories}
    />
  );
}