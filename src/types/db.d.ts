import { Document } from "@prisma/client";

export type DocumentType = Pick<Document, "title" | "id" | "iconImage">;

export type InitialDoc = Pick<Document, "id"> | null;
