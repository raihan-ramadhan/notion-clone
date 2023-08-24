import "server-only";
import { prisma } from "@/lib/db";

export async function getIsOwner(publicId: string, ownerId: string) {
  const count = await prisma.document.count({
    where: {
      publicId,
      ownerId,
    },
  });
  return count !== 0;
}
