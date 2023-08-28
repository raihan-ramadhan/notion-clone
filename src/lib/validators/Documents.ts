import { z } from "zod";

export const DocumentDeleteValidator = z.object({
  id: z.string(),
  currentDoc: z.string(),
});

export type DeleteDocumentPayload = z.infer<typeof DocumentDeleteValidator>;

export const DocumentUpdateValidator = z.object({
  id: z.string(),
  editorJson: z.any(),
});

export type UpdateDocumentPayload = z.infer<typeof DocumentUpdateValidator>;

export const TitleUpdateValidator = z.object({
  title: z.string(),
  id: z.string(),
});

export type UpdateTitlePayload = z.infer<typeof TitleUpdateValidator>;
