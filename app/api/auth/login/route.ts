import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

import { signToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          username,
        },
      });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const token = signToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    const response =
      NextResponse.json({
        message: "Login success",
      });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;

  } catch {

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );

  }
}