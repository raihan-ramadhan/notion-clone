import { deleteImg } from "@/actions/deleteImg";
import { getIsOwner } from "@/actions/getIsOwner";
import {
  CLOUDINARY_COVER_IMAGE_FOLDER,
  CLOUDINARY_ICON_IMAGE_FOLDER,
} from "@/config/cloudinary";
import { prisma } from "@/lib/db";
import {
  Context,
  imagesRemoveDocSchema,
  routeContextSchema,
} from "@/lib/validators/route";
import { auth } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(request: Request, context: Context) {
  try {
    // check auth
    const { userId } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Validate the route params
    const {
      params: { publicId },
    } = routeContextSchema.parse(context);

    const isOwner = await getIsOwner(publicId, userId);

    if (!isOwner) {
      return new Response("Forbidden", { status: 403 });
    }

    // Get the request body and validate it.
    const json = await request.json();
    const { id, isCoverImage, isIconImage } = imagesRemoveDocSchema.parse(json);

    if (!isIconImage && !isCoverImage) {
      return new Response("Please provide isIconImage or isCoverImage", {
        status: 422,
      });
    }

    // eliminate which data we want update, icon or cover image

    const data = { [isIconImage ? "iconImage" : "coverImage"]: null } as const;

    // Update the document
    await prisma.document.update({ where: { id }, data });

    // prettier-ignore
    const path = `${isIconImage ? CLOUDINARY_ICON_IMAGE_FOLDER : CLOUDINARY_COVER_IMAGE_FOLDER}/${publicId}`;

    const { result } = await deleteImg(path);

    if (result == "not found") {
      return new Response(`Image with public id ${publicId} not founded`, {
        status: 404,
      });
    }

    return NextResponse.json(
      { message: "Successfully removed image" },
      { status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return NextResponse.json(
      {
        message:
          error.message ||
          "Something went wrong when destroy icon image/cover image",
      },
      { status: 500 }
    );
  }
}
