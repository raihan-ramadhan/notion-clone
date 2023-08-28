import { auth } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { TitleUpdateValidator } from "@/lib/validators/Documents";

import { Context, routeContextSchema } from "@/lib/validators/route";
import { getIsOwner } from "@/actions/getIsOwner";

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
    const { title, id } = TitleUpdateValidator.parse(body);

    await prisma.document.update({
      where: { id, publicId },
      data: { title },
    });

    return NextResponse.json("Edited", { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return NextResponse.json(
      {
        message: error.message || "Something went wrong when update title",
      },
      { status: 500 }
    );
  }
}
