import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {

  const challenges =
    await prisma.challenge.findMany({
      include: {
        category: true,
      },
      orderBy: {
        points: "asc",
      },
    });

  return NextResponse.json(challenges);
}