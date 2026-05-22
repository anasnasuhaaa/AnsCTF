import { NextResponse } from "next/server";

export async function POST() {

  const response =
    NextResponse.json({
      message: "Logout success",
    });

  response.cookies.set({
    name: "token",
    value: "",
    path: "/",
    expires: new Date(0),
  });

  return response;
}