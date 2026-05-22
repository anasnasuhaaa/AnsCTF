"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import { toast }
from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { CategoryForm }
from "@/components/admin/category-form";

type Props = {
  category: any;
};

export function EditCategoryModal({
  category,
}: Props) {

  const router =
    useRouter();

  const [open, setOpen] =
    useState(false);

  async function handleUpdate(
    values: any
  ) {

    try {

      const res = await fetch(
        `/api/admin/categories/${category.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(
        "Category updated"
      );

      setOpen(false);

      router.refresh();

    } catch {

      toast.error(
        "Something went wrong"
      );

    }
  }

  async function handleDelete() {

    try {

      const res = await fetch(
        `/api/admin/categories/${category.id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(
        "Category deleted"
      );

      router.refresh();

    } catch {

      toast.error(
        "Something went wrong"
      );

    }
  }

  return (
    <div className="flex items-center gap-4">

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >

        <DialogTrigger asChild>

          <button className="text-emerald-400 hover:text-emerald-300">

            Edit

          </button>

        </DialogTrigger>

       <DialogContent className="border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl text-zinc-100 sm:max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500/50">

          <DialogHeader>

            <DialogTitle>
              Edit Category
            </DialogTitle>

          </DialogHeader>

          <CategoryForm
            initialValues={{
              name:
                category.name,
            }}
            onSubmit={handleUpdate}
          />

        </DialogContent>

      </Dialog>

      <AlertDialog>

        <AlertDialogTrigger asChild>

          <button className="text-red-400 hover:text-red-300">

            Delete

          </button>

        </AlertDialogTrigger>

        <AlertDialogContent className="border-white/10 bg-zinc-950 text-white">

          <AlertDialogHeader>

            <AlertDialogTitle>
              Delete Category
            </AlertDialogTitle>

            <AlertDialogDescription>

              This action cannot be undone.

            </AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter>

            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>

    </div>
  );
}