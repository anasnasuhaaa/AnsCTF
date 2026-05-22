import { prisma } from "@/lib/prisma";

export default async function LeaderboardPage() {

  const users =
    await prisma.user.findMany({
      orderBy: {
        score: "desc",
      },
    });

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">

      <div className="mx-auto max-w-5xl">

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Leaderboard
          </h1>

          <p className="mt-2 text-zinc-400">
            Top players ranking.
          </p>

        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">

          <table className="w-full">

            <thead className="border-b border-white/10 bg-zinc-800/50">

              <tr>

                <th className="px-6 py-4 text-left">
                  Rank
                </th>

                <th className="px-6 py-4 text-left">
                  Player
                </th>

                <th className="px-6 py-4 text-right">
                  Score
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user, index) => (

                <tr
                  key={user.id}
                  className="border-b border-white/5"
                >

                  <td className="px-6 py-4">
                    #{index + 1}
                  </td>

                  <td className="px-6 py-4">
                    {user.username}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold">
                    {user.score}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}