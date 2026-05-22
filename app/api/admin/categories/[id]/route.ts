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

    const { name } = body;

    if (!name) {
      return NextResponse.json(
        {
          message: "Category name is required",
        },
        {
          status: 400,
        },
      );
    }

    await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json({
      message: "Category updated",
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

    const challengeCount = await prisma.challenge.count({
      where: {
        categoryId: id,
      },
    });

    if (challengeCount > 0) {
      return NextResponse.json(
        {
          message: "Cannot delete category with challenges",
        },
        {
          status: 400,
        },
      );
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Category deleted",
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
