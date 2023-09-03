import { createUntitled } from "@/actions/createUntitled";
import { auth } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { id } = await createUntitled(userId);

    return NextResponse.json(id, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.message || "Something went wrong when create untiled document",
      },
      { status: 500 }
    );
  }
}
