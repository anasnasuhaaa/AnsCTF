"use client";

import { EditChallengeModal }
from "@/components/admin/edit-challenge-modal";

type Props = {
  challenges: any[];
  categories: any[];
};

export function ChallengeTable({
  challenges,
  categories,
}: Props) {

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">

      <table className="w-full">

        <thead className="border-b border-white/10 bg-zinc-800/50">

          <tr>

            <th className="px-6 py-4 text-left">
              Title
            </th>

            <th className="px-6 py-4 text-left">
              Category
            </th>

            <th className="px-6 py-4 text-right">
              Points
            </th>

            <th className="px-6 py-4 text-right">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {challenges.map((challenge) => (

            <tr
              key={challenge.id}
              className="border-b border-white/5"
            >

              <td className="px-6 py-4">
                {challenge.title}
              </td>

              <td className="px-6 py-4">
                {challenge.category.name}
              </td>

              <td className="px-6 py-4 text-right">
                {challenge.points}
              </td>

              <td className="px-6 py-4">

                <div className="flex justify-end">

                  <EditChallengeModal
                    challenge={challenge}
                    categories={categories}
                  />

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}