import Link from "next/link";

import { requireAdmin }
from "@/lib/auth/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  await requireAdmin();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <div className="flex">

        <aside className="min-h-screen w-64 border-r border-white/10 bg-zinc-900 p-6">

          <h1 className="mb-8 text-2xl font-bold">
            Admin Panel
          </h1>

          <nav className="space-y-3">

            <Link
              href="/admin"
              className="block rounded-lg px-4 py-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/challenges"
              className="block rounded-lg px-4 py-2 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              Challenges
            </Link>

          </nav>

        </aside>

        <div className="flex-1 p-8">
          {children}
        </div>

      </div>

    </main>
  );
}