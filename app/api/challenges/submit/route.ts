import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUser } from "@/lib/auth/get-user";

export async function POST(req: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { challengeId, flag } = body;

    if (!challengeId || !flag) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const challenge = await prisma.challenge.findUnique({
      where: {
        id: challengeId,
      },
    });

    if (!challenge) {
      return NextResponse.json(
        { message: "Challenge not found" },
        { status: 404 },
      );
    }

    const existingSolve = await prisma.solve.findFirst({
      where: {
        userId: user.id,
        challengeId,
      },
    });

    if (existingSolve) {
      if (flag === challenge.flag) {
        return NextResponse.json(
          {
            message: "Correct answer, but challenge already solved before",
            type: "already_correct",
          },
          {
            status: 200,
          },
        );
      }

      return NextResponse.json(
        {
          message: "Wrong answer, but challenge already solved before",
          type: "already_wrong",
        },
        {
          status: 400,
        },
      );
    }

    if (flag !== challenge.flag) {
      return NextResponse.json(
        {
          message: "Wrong flag",
          type: "wrong",
        },
        {
          status: 400,
        },
      );
    }

    await prisma.solve.create({
      data: {
        userId: user.id,
        challengeId,
      },
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        score: {
          increment: challenge.points,
        },
      },
    });

    return NextResponse.json({
      message: "Correct flag!",
    });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
