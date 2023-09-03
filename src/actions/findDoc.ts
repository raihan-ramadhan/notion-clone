import "server-only";
import { prisma } from "@/lib/db";

export async function findDoc(id: string) {
  const document = await prisma.document.findFirst({
    where: { id },
  });
  return document;
}
