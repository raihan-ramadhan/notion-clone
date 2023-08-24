import { prisma } from "@/lib/db";
import { DocumentType } from "@/types/db";
import { auth } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const docs: DocumentType[] = await prisma.document.findMany({
      where: { ownerId: userId },
      select: {
        publicId: true,
        title: true,
        id: true,
        iconImage: true,
      },
    });

    return NextResponse.json(docs);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Could not fetch documents" },
      { status: 500 }
    );
  }
}
