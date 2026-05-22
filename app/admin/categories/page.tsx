import { prisma }
from "@/lib/prisma";

import { CreateCategoryModal }
from "@/components/admin/create-category-modal";

import { CategoryTable }
from "@/components/admin/category-table";

export default async function CategoriesPage() {

  const categories =
    await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: {
          select: {
            challenges: true,
          },
        },
      },
    });

  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Categories
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage challenge categories.
          </p>

        </div>

        <CreateCategoryModal />

      </div>

      <CategoryTable
        categories={categories}
      />

    </div>
  );
}