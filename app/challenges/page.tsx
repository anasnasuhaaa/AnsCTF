import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth/get-user";

import { prisma } from "@/lib/prisma";

import { ChallengeCard }
  from "@/components/challenge/challenge-card";
import { UserNavbar }
  from "@/components/layout/user-navbar";

import { ChallengeList }
  from "@/components/challenge/challenge-list";

export default async function ChallengesPage() {

  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const challenges =
    await prisma.challenge.findMany({
      include: {
        category: true,
        solves: {
          where: {
            userId: user.id,
          },
        },
      },
      orderBy: {
        points: "asc",
      },
    });
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <UserNavbar
        username={user.username}
        role={user.role}
      />

      <div className="mx-auto max-w-7xl p-8">

        <div className="mb-12">

          <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-400">
            Live Challenges
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            Challenges
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Practice reverse engineering,
            cryptography, web exploitation,
            forensics, and more.
          </p>

        </div>

        <ChallengeList
          challenges={challenges}
        />

      </div>

    </main>
  );
}