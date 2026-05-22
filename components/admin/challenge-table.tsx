"use client";

import { EditChallengeModal } from "@/components/admin/edit-challenge-modal";

type Props = {
  challenges: any[];
  categories: any[];
};

export function ChallengeTable({ challenges, categories }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/50 backdrop-blur-xl shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap text-left text-sm text-zinc-300">
          
          <thead className="border-b border-zinc-800/60 bg-zinc-950/50 font-semibold text-zinc-400">
            <tr>
              <th className="px-6 py-5 pl-8">Title</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5 text-right">Points</th>
              <th className="px-6 py-5 pr-8 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800/50">
            {challenges.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-zinc-500">
                  No challenges found. Create one to get started.
                </td>
              </tr>
            ) : (
              challenges.map((challenge) => (
                <tr
                  key={challenge.id}
                  className="group hover:bg-zinc-800/30 transition-colors"
                >
                  
                  {/* Title Column */}
                  <td className="px-6 py-4 pl-8">
                    <span className="font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                      {challenge.title}
                    </span>
                  </td>

                  {/* Category Column */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md border border-zinc-700/50 bg-zinc-800/50 px-2.5 py-1 text-xs font-medium text-zinc-300">
                      {challenge.category.name}
                    </span>
                  </td>

                  {/* Points Column */}
                  <td className="px-6 py-4 text-right">
                    <span className="font-mono font-semibold text-emerald-400">
                      {challenge.points}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 pr-8">
                    <div className="flex justify-end opacity-80 group-hover:opacity-100 transition-opacity">
                      <EditChallengeModal
                        challenge={challenge}
                        categories={categories}
                      />
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}