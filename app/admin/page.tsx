import { prisma } from "@/lib/prisma";


export default async function AdminPage() {

  const [
    users,
    challenges,
    solves,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.challenge.count(),
    prisma.solve.count(),
  ]);

  return (
    <div>

      <h1 className="mb-8 text-4xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Users
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {users}
          </h2>

        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Challenges
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {challenges}
          </h2>

        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Solves
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {solves}
          </h2>

        </div>

      </div>

    </div>
  );
}