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

    const {
      title,
      description,
      points,
      flag,
      categoryId,
    } = body;

    if (
      !title ||
      !description ||
      !flag ||
      !categoryId
    ) {
      return NextResponse.json(
        {
          message:
            "Missing fields",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.challenge.create({
      data: {
        title,
        description,
        points:
          Number(points),

        flag,

        categoryId,

        authorId:
          user.id,
      },
    });

    return NextResponse.json({
      message:
        "Challenge created",
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