import { auth } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getInitialDoc } from "@/actions/getInitialDoc";
import { z } from "zod";
import {
  DocumentDeleteValidator,
  DocumentUpdateValidator,
} from "@/lib/validators/Documents";
import { createUntitled } from "@/actions/createUntitled";
import { deleteImg } from "@/actions/deleteImg";
import {
  CLOUDINARY_COVER_IMAGE_FOLDER,
  CLOUDINARY_ICON_IMAGE_FOLDER,
} from "@/config/cloudinary";
import { Context, routeContextSchema } from "@/lib/validators/route";
import { getIsOwner } from "@/actions/getIsOwner";

export async function DELETE(req: Request, context: Context) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Validate the route params.
    const {
      params: { publicId },
    } = routeContextSchema.parse(context);

    const isOwner = await getIsOwner(publicId, userId);

    if (!isOwner) {
      return new Response("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const { currentDoc, id } = DocumentDeleteValidator.parse(body);

    const deleteDocMongDB = async () =>
      await prisma.document.delete({
        where: { id },
      });

    // run 3 function, delete document on mongodb, delete iconImage and coverImage(whether there is or not because it will return {result:"not found"} or {"result": "ok"})
    await Promise.all([
      deleteDocMongDB(),
      deleteImg(`${CLOUDINARY_ICON_IMAGE_FOLDER}/${publicId}`),
      deleteImg(`${CLOUDINARY_COVER_IMAGE_FOLDER}/${publicId}`),
    ]);

    if (publicId == currentDoc) {
      // if doc that we want delete is same with current publicId (current page) then redirect to the first doc
      const document = await getInitialDoc(userId);
      if (document) {
        return NextResponse.json(document.publicId);
      }

      // if there is no doc from user then create one
      const newDocument = await createUntitled(userId);
      return NextResponse.json(newDocument.publicId, { status: 201 });
    }

    return NextResponse.json(null, { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return NextResponse.json(
      {
        message: error.message || "Something went wrong when delete a document",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: Context) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Validate the route params.
    const {
      params: { publicId },
    } = routeContextSchema.parse(context);

    const isOwner = await getIsOwner(publicId, userId);

    if (!isOwner) {
      return new Response("Forbidden", { status: 403 });
    }

    const body = await req.json();
    const { editorJson, id } = DocumentUpdateValidator.parse(body);

    await prisma.document.update({
      where: { id, publicId },
      data: { editorJson },
    });

    return NextResponse.json("Edited", { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return NextResponse.json(
      {
        message: error.message || "Something went wrong when update a document",
      },
      { status: 500 }
    );
  }
}
