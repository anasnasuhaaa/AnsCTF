"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type Props = {
  username: string;
  role: string;
};

export function UserNavbar({
  username,
  role
}: Props) {

  const router = useRouter();

  async function handleLogout() {

    await fetch(
      "/api/auth/logout",
      {
        method: "POST",
      }
    );

    toast.success(
      "Logout success"
    );

    router.push("/login");

    router.refresh();
  }

  return (
    <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/challenges"
          className="text-xl font-bold"
        >
          AnsCTF
        </Link>

        <nav className="flex items-center gap-6">

          <Link
            href="/challenges"
            className="text-sm text-zinc-300 hover:text-white"
          >
            Challenges
          </Link>

          <Link
            href="/leaderboard"
            className="text-sm text-zinc-300 hover:text-white"
          >
            Leaderboard
          </Link>
          {
            role === "ADMIN" && (
              <Link
                href="/admin"
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                Dashboard
              </Link>
            )
          }
          <div className="flex items-center gap-3">

            <div className="text-sm text-zinc-400">
              @{username}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </div>

        </nav>

      </div>

    </header>
  );
}