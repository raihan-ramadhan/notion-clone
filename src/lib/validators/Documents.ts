import { z } from "zod";

export const DocumentDeleteValidator = z.object({
  id: z.string(),
  currentDoc: z.string(),
});

export type DeleteDocumentPayload = z.infer<typeof DocumentDeleteValidator>;
