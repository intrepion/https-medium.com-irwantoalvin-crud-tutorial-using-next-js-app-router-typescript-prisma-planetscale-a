import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

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
