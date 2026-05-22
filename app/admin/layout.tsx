import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="sticky top-0 h-screen w-64 flex-col border-r border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl p-6 hidden md:flex">

          {/* Brand/Logo */}
          <div className="mb-10 flex items-center">
            <Link href="/admin" className="text-2xl font-black tracking-tight text-white">
              Ans<span className="text-emerald-400">Admin</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            <Link
              href="/admin"
              className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-emerald-500/10 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20"
            >
              <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Overview
            </Link>

            <Link
              href="/admin/challenges"
              className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-emerald-500/10 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20"
            >
              <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              Challenges
            </Link>
            <Link
              href="/admin/categories"
              className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-emerald-500/10 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20"
            >
              <svg
                className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              Categories
            </Link>
          </nav>

          {/* Bottom Action (Back to App) */}
          <div className="pt-6 border-t border-zinc-800/60">
            <Link
              href="/challenges"
              className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white"
            >
              <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to App
            </Link>
          </div>

        </aside>

        {/* Main Content Area */}
        <div className="relative flex-1 p-6 md:p-10 lg:p-12 min-h-screen overflow-y-auto">
          {/* Subtle Background Glow Effect for the content area */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto">
            {children}
          </div>
        </div>

      </div>
    </main>
  );
}