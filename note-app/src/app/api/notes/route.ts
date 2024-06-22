import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { unstable_noStore } from "next/cache";

// Action to read
export const GET = async () => {
  unstable_noStore();
  const notes = await prisma.note.findMany({});
  return NextResponse.json({
    notes,
  });
};

// Action to create
export const POST = async (req: NextRequest) => {
  const { title, content } = await req.json();

  const note = await prisma.note.create({
    data: {
      title,
      content,
    },
  });

  return NextResponse.json({
    note,
  });
};
