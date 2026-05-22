import { prisma } from "@/lib/prisma";

import { CreateChallengeModal } from "@/components/admin/create-challenge-modal";
import { ChallengeTable } from "@/components/admin/challenge-table";

export default async function AdminChallengesPage() {
  const challenges = await prisma.challenge.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Manage <span className="text-emerald-400">Challenges</span>
          </h1>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base">
            Create, edit, and oversee all CTF challenges in the system.
          </p>
        </div>

        {/* Create Modal Component */}
        <CreateChallengeModal categories={categories} />
      </div>

      {/* Table Section */}
      <ChallengeTable challenges={challenges} categories={categories} />

    </div>
  );
}