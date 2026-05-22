import { redirect } from "next/navigation";

import { getUser } from "./get-user";

export async function requireAdmin() {

  const user =
    await getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/challenges");
  }

  return user;
}