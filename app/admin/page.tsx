import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [users, challenges, solves] = await Promise.all([
    prisma.user.count(),
    prisma.challenge.count(),
    prisma.solve.count(),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          System <span className="text-emerald-400">Overview</span>
        </h1>
        <p className="mt-2 text-zinc-400 text-sm sm:text-base">
          Real-time statistics and metrics for the AnsCTF platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Card 1: Users */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-6 backdrop-blur-xl transition-all hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
          <div className="relative z-10 flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
              Total Users
            </p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/50 text-emerald-400 border border-zinc-700/50">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight drop-shadow-sm">
            {users}
          </h2>
        </div>

        {/* Card 2: Challenges */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-6 backdrop-blur-xl transition-all hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
          <div className="relative z-10 flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
              Active Challenges
            </p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/50 text-emerald-400 border border-zinc-700/50">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight drop-shadow-sm">
            {challenges}
          </h2>
        </div>

        {/* Card 3: Solves */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-6 backdrop-blur-xl transition-all hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
          <div className="relative z-10 flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
              Total Solves
            </p>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800/50 text-emerald-400 border border-zinc-700/50">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight drop-shadow-sm">
            {solves}
          </h2>
        </div>

      </div>
    </div>
  );
}