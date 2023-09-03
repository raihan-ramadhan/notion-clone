import "server-only";
import { prisma } from "@/lib/db";

export async function createUntitled(ownerId: string) {
  const newPage = await prisma.document.create({
    data: {
      ownerId,
      title: "Untitled",
    },
    select: { id: true },
  });

  return newPage;
}
