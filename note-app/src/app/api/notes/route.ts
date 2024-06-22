import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

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
