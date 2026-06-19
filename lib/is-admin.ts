import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export async function isAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return false;

  const admin = await prisma.admin.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return !!admin;
}