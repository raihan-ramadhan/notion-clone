import { auth } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getInitialDoc } from "@/actions/getInitialDoc";
import { z } from "zod";
import { DocumentDeleteValidator } from "@/lib/validators/Documents";
import { createUntitled } from "@/actions/createUntitled";

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { currentDoc, id, publicId } = DocumentDeleteValidator.parse(body);

    // Delete document by id
    await prisma.document.delete({
      where: { id },
    });

    if (publicId == currentDoc) {
      // if doc that we want delete is same with current publicId (current page) then redirect to the first doc
      const document = await getInitialDoc(userId);

      if (document) {
        return NextResponse.json(document.publicId);
      }

      // if there is no doc from user then create one
      const { publicId } = await createUntitled(userId);

      return NextResponse.json(publicId);
    }

    return NextResponse.json(null);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not delete document", { status: 500 });
  }
}
