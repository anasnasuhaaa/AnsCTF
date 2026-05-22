import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/prisma";

import { UserNavbar } from "@/components/layout/user-navbar";
import { ChallengeList } from "@/components/challenge/challenge-list";

export default async function ChallengesPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const challenges = await prisma.challenge.findMany({
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
    <main className="relative min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 pb-20">
      <UserNavbar username={user.username} role={user.role} />

      {/* Subtle Emerald Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl p-6 sm:p-8">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-start">
          <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 mb-4 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Live Challenges
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
            Hack The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">Flags</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Practice reverse engineering, cryptography, web exploitation, forensics, and more. 
            Select a challenge below to begin.
          </p>
        </div>

        <ChallengeList challenges={challenges} />

      </div>
    </main>
  );
}