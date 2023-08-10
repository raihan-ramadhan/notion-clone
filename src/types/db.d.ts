import { Documents } from "@prisma/client";

export type DocumentType = Pick<Documents, "publicId" | "title" | "id">;

export type InitialDoc = Pick<Documents, "publicId"> | null;
