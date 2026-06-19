import NavbarClient from "./navbar-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";

export default async function NavbarWrapper() {
  const session = await getServerSession(authOptions);

  let isAdmin = false;

  if (session?.user?.email) {
    const admin = await prisma.admin.findUnique({
      where: { email: session.user.email },
    });

    isAdmin = !!admin;
  }

  return <NavbarClient isAdmin={isAdmin} />;
}