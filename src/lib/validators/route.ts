import { z } from "zod";

export const routeContextSchema = z.object({
  params: z.object({
    documentId: z.string(),
  }),
});

export type Context = z.infer<typeof routeContextSchema>;

export const imagesDocSchema = z.object({
  id: z.string().min(1),
  iconImageUrl: z.string().min(1).optional(),
  coverImageUrl: z.string().min(1).optional(),
});

export type IconImagePayload = Pick<z.infer<typeof imagesDocSchema>, "id"> & {
  iconImageUrl: string;
};
export type CoverImagePayload = Pick<z.infer<typeof imagesDocSchema>, "id"> & {
  coverImageUrl: string;
};

export const imagesRemoveDocSchema = z.object({
  id: z.string().min(1),
  isIconImage: z.boolean().optional(),
  isCoverImage: z.boolean().optional(),
});

export type RemoveIconImagePayload = Pick<
  z.infer<typeof imagesRemoveDocSchema>,
  "id"
> & {
  isIconImage: boolean;
};

export type RemoveCoverImagePayload = Pick<
  z.infer<typeof imagesRemoveDocSchema>,
  "id"
> & {
  isCoverImage: boolean;
};
