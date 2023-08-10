import "server-only";
import { prisma } from "@/lib/db";
import { InitialDoc } from "@/types/db";

export async function getInitialDoc(ownerId: string) {
  const documents: InitialDoc = await prisma.documents.findFirst({
    where: { ownerId },
    select: { publicId: true },
  });
  return documents;
}
