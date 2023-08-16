import { Document } from "@prisma/client";

export type DocumentType = Pick<
  Document,
  "publicId" | "title" | "id" | "iconImage"
>;

export type InitialDoc = Pick<Document, "publicId"> | null;
