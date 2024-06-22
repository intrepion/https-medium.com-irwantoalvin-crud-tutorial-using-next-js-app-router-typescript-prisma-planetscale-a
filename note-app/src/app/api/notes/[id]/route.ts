import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore } from "next/cache";
import prisma from "../../../../lib/prisma";

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string } },
) => {
  const id = Number(context.params.id || 0);

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

export const GET = async (
  _req: NextRequest,
  context: { params: { id: string } },
) => {
  unstable_noStore();
  const id = Number(context.params.id || 0);

  const note = await prisma.note.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ note });
};

// Action to update or edit
export const PUT = async (
  req: NextRequest,
  context: { params: { id: string } },
) => {
  const { title, content } = await req.json();
  const id = Number(context.params.id || 0);

  const note = await prisma.note.update({
    where: {
      id: Number(id),
    },

    data: {
      title,
      content,
    },
  });

  return NextResponse.json({
    note,
  });
};
