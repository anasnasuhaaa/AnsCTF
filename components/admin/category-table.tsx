"use client";

import { EditCategoryModal }
from "@/components/admin/edit-category-modal";

type Props = {
  categories: any[];
};

export function CategoryTable({
  categories,
}: Props) {

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">

      <table className="w-full">

        <thead className="border-b border-white/10 bg-zinc-800/50">

          <tr>

            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-right">
              Challenges
            </th>

            <th className="px-6 py-4 text-right">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {categories.map((category) => (

            <tr
              key={category.id}
              className="border-b border-white/5"
            >

              <td className="px-6 py-4">
                {category.name}
              </td>

              <td className="px-6 py-4 text-right">
                {category._count.challenges}
              </td>

              <td className="px-6 py-4">

                <div className="flex justify-end">

                  <EditCategoryModal
                    category={category}
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