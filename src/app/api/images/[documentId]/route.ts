import { getIsOwner } from "@/actions/getIsOwner";
import { prisma } from "@/lib/db";
import {
  Context,
  imagesDocSchema,
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
      params: { documentId },
    } = routeContextSchema.parse(context);

    const isOwner = await getIsOwner(documentId, userId);

    if (!isOwner) {
      return new Response("Forbidden", { status: 403 });
    }

    // Get the request body and validate it.
    const json = await request.json();
    const { id, coverImageUrl, iconImageUrl } = imagesDocSchema.parse(json);

    if (!coverImageUrl && !iconImageUrl) {
      return new Response("Please provide coverImageUrl or iconImageUrl", {
        status: 422,
      });
    }

    const timeStamp = new Date().getTime().toString();

    // this api use when upload iconImage or coverImage so we need eliminate which request we want update, icon or cover image
    const data = iconImageUrl
      ? { iconImage: { url: iconImageUrl, timeStamp } }
      : { coverImage: { url: coverImageUrl, timeStamp } };

    // Update the document
    await prisma.document.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      { message: "Successfully added image" },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return NextResponse.json(
      {
        message:
          error.message ||
          "Something went wrong when change icon image or cover image",
      },
      { status: 500 }
    );
  }
}
