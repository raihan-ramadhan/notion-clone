import "server-only";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function deleteImg(path: string) {
  const result = await cloudinary.uploader.destroy(path, {
    resource_type: "image",
    invalidate: true,
  });

  return result as { result: string };
}
