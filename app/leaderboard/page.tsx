import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar"; // Pastikan path ini sesuai dengan struktur folder Anda
import { getUser } from "@/lib/auth/get-user";
import { UserNavbar } from "@/components/layout/user-navbar";

export default async function LeaderboardPage() {
  const user = await getUser();
  const users = await prisma.user.findMany({
    orderBy: {
      score: "desc",
    },
  });

  return (
    <main className="relative min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 pb-20">

      {/* Memanggil Navbar */}
      {user ? (
        <UserNavbar username={user.username} role={user.role} />
      ) : (
        <Navbar />
      )}


      {/* Subtle Emerald Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 lg:py-20">

        {/* Header Section */}
        <div className="mb-10 flex flex-col items-center text-center sm:items-start sm:text-left">
          <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 mb-4 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            Hall of Fame
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">Leaderboard</span>
          </h1>
          <p className="mt-4 text-zinc-400 max-w-2xl text-base sm:text-lg">
            Ranking of the most elite hackers on the platform. Solve challenges, earn points, and climb to the top.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-left">

              <thead className="border-b border-zinc-800/60 bg-zinc-950/50 text-sm font-semibold text-zinc-400">
                <tr>
                  <th className="px-6 py-5 pl-8 w-24">Rank</th>
                  <th className="px-6 py-5">Player</th>
                  <th className="px-6 py-5 text-right pr-8">Score</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800/50">
                {users
                  .filter((user) => user.role !== "ADMIN") // Memfilter agar ADMIN tidak masuk
                  .map((user, index) => {
                    const isTop1 = index === 0;
                    const isTop2 = index === 1;
                    const isTop3 = index === 2;

                    return (
                      <tr
                        key={user.id}
                        className="group hover:bg-zinc-800/30 transition-colors"
                      >
                        {/* Rank Column */}
                        <td className="px-6 py-4 pl-8">
                          <div className="flex items-center">
                            {isTop1 ? (
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500 font-bold border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                                1
                              </span>
                            ) : isTop2 ? (
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-300/20 text-zinc-300 font-bold border border-zinc-300/30">
                                2
                              </span>
                            ) : isTop3 ? (
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600/20 text-amber-500 font-bold border border-amber-600/30">
                                3
                              </span>
                            ) : (
                              <span className="flex h-8 w-8 items-center justify-center text-zinc-500 font-mono text-sm">
                                #{index + 1}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Player Column */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {/* Avatar Placeholder */}
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-emerald-400 border border-zinc-800 group-hover:border-emerald-500/50 transition-colors">
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                            <span className={`font-medium ${isTop1 ? 'text-emerald-400' : 'text-zinc-200'} group-hover:text-emerald-300 transition-colors`}>
                              {user.username}
                            </span>
                          </div>
                        </td>

                        {/* Score Column */}
                        <td className="px-6 py-4 text-right pr-8">
                          <span className="font-mono text-lg font-semibold text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                            {user.score}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4 border border-zinc-700/50">
                <svg className="h-6 w-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M8 16l-4-4 4-4" />
                </svg>
              </div>
              <p className="text-zinc-400 font-medium">No hackers on the board yet.</p>
              <p className="text-zinc-500 text-sm mt-1">Be the first to solve a challenge!</p>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}