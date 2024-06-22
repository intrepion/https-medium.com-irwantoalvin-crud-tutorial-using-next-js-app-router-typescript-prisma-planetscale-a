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

// Action to delete
export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url).searchParams;
  const id = Number(url.get("id")) || 0;

  const note = await prisma.note.delete({
    where: {
      id: id,
    },
  });

  if (!note) {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({});
};
