/* eslint-disable no-unused-vars */
import "server-only";
import { PrismaClient } from "@prisma/client";
import { env } from "@/env.mjs";
import { JSONContent } from "@tiptap/react";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

declare global {
  namespace PrismaJson {
    type ImageType = {
      url: string;
      timeStamp: string;
    };
    type EditorJson = JSONContent;
  }
}
