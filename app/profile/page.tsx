import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { getUser } from "@/lib/auth/get-user";

import { UserNavbar }
from "@/components/layout/user-navbar";

export default async function ProfilePage() {

  const user =
    await getUser();

  if (!user) {
    redirect("/login");
  }

  const profile =
    await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        solves: {
          include: {
            challenge: {
              include: {
                category: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!profile) {
    redirect("/login");
  }

  const allUsers =
    await prisma.user.findMany({
      orderBy: {
        score: "desc",
      },
    });

  const rank =
    allUsers.findIndex(
      (u) => u.id === profile.id
    ) + 1;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <UserNavbar
        username={profile.username}
      />

      <div className="mx-auto max-w-6xl p-8">

        <div className="grid gap-6 lg:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-zinc-900 p-8">

            <div className="flex items-center gap-4">

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/20 text-3xl font-bold text-emerald-400">

                {profile.username
                  .charAt(0)
                  .toUpperCase()}

              </div>

              <div>

                <h1 className="text-3xl font-bold">
                  {profile.username}
                </h1>

                <p className="mt-1 text-zinc-400">
                  Rank #{rank}
                </p>

              </div>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-xl border border-white/10 bg-zinc-800/50 p-4">

                <p className="text-sm text-zinc-400">
                  Score
                </p>

                <h2 className="mt-2 text-3xl font-bold text-emerald-400">
                  {profile.score}
                </h2>

              </div>

              <div className="rounded-xl border border-white/10 bg-zinc-800/50 p-4">

                <p className="text-sm text-zinc-400">
                  Solves
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {profile.solves.length}
                </h2>

              </div>

            </div>

          </div>

          <div className="lg:col-span-2">

            <div className="rounded-2xl border border-white/10 bg-zinc-900 p-8">

              <div className="mb-6">

                <h2 className="text-2xl font-bold">
                  Recent Solves
                </h2>

                <p className="mt-1 text-zinc-400">
                  Latest completed challenges.
                </p>

              </div>

              <div className="space-y-4">

                {profile.solves.length === 0 ? (

                  <div className="rounded-xl border border-dashed border-white/10 p-10 text-center text-zinc-500">

                    No solves yet.

                  </div>

                ) : (

                  profile.solves.map((solve) => (

                    <div
                      key={solve.id}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-800/40 p-4"
                    >

                      <div>

                        <h3 className="font-semibold">
                          {solve.challenge.title}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-400">
                          {solve.challenge.category.name}
                        </p>

                      </div>

                      <div className="text-right">

                        <div className="font-bold text-emerald-400">
                          +{solve.challenge.points}
                        </div>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}