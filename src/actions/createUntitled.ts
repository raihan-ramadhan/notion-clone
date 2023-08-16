import "server-only";
import { prisma } from "@/lib/db";
import { nanoid } from "nanoid";

export async function createUntitled(ownerId: string) {
  const newId = nanoid(12);
  const newPage = await prisma.document.create({
    data: {
      ownerId,
      publicId: newId,
      title: "Untitled",
    },
  });

  return newPage;
}
