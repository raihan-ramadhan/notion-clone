import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { publicId } = await req.json();

    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await prisma.documents.create({
      data: {
        publicId,
        ownerId: userId,
        title: "Untitled",
      },
    });

    return NextResponse.json(publicId);
  } catch (error) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
