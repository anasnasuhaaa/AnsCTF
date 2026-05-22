import { NextResponse }
from "next/server";

import { prisma }
from "@/lib/prisma";

import { getUser }
from "@/lib/auth/get-user";

export async function POST(
  req: Request
) {

  try {

    const user =
      await getUser();

    if (
      !user ||
      user.role !== "ADMIN"
    ) {

      return NextResponse.json(
        {
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }

    const body =
      await req.json();

    const { name } =
      body;

    if (!name) {

      return NextResponse.json(
        {
          message:
            "Category name is required",
        },
        {
          status: 400,
        }
      );

    }

    const existingCategory =
      await prisma.category.findFirst({
        where: {
          name,
        },
      });

    if (existingCategory) {

      return NextResponse.json(
        {
          message:
            "Category already exists",
        },
        {
          status: 400,
        }
      );

    }

    await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      message:
        "Category created",
    });

  } catch {

    return NextResponse.json(
      {
        message:
          "Internal server error",
      },
      {
        status: 500,
      }
    );

  }
}