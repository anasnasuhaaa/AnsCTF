import { cookies } from "next/headers";

import { verifyToken } from "./jwt";

export async function getUser() {

  const cookieStore =
    await cookies();

  const token =
    cookieStore.get("token");

  if (!token) return null;

  const user =
    verifyToken(token.value);

  return user;
}