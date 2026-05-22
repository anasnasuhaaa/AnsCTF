import { prisma }
  from "@/lib/prisma";

import { CreateChallengeModal }
  from "@/components/admin/create-challenge-modal";

import { ChallengeTable }
  from "@/components/admin/challenge-table";

export default async function AdminChallengesPage() {

  const challenges =
    await prisma.challenge.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const categories =
    await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Challenges
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage all challenges.
          </p>

        </div>

        <CreateChallengeModal
          categories={categories}
        />

      </div>

      <ChallengeTable
        challenges={challenges}
        categories={categories}
      />

    </div>
  );
}