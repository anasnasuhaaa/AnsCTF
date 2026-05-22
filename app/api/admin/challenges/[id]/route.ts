import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUser } from "@/lib/auth/get-user";

export async function PATCH(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const user = await getUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await context.params;

    const body = await req.json();

    await prisma.challenge.update({
      where: {
        id,
      },
      data: {
        title: body.title,

        description: body.description,

        points: Number(body.points),

        flag: body.flag,

        attachmentUrl: body.attachmentUrl,

        attachmentName: body.attachmentName,

        categoryId: body.categoryId,
      },
    });

    return NextResponse.json({
      message: "Challenge updated",
    });
  } catch {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const user = await getUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await context.params;

    await prisma.solve.deleteMany({
      where: {
        challengeId: id,
      },
    });

    await prisma.challenge.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Challenge deleted",
    });
  } catch {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
