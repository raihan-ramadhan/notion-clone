import "server-only";
import { prisma } from "@/lib/db";

export async function findDoc(publicId: string) {
  const document = await prisma.document.findFirst({
    where: { publicId },
  });
  return document;
}
