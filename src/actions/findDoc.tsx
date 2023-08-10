import "server-only";
import { prisma } from "@/lib/db";

export async function findDoc(publicId: string) {
  const document = await prisma.documents.findFirst({
    where: { publicId },
  });
  return document;
}
