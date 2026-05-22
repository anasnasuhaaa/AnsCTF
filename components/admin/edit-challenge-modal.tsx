"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import { toast }
from "sonner";

import { Button }
from "@/components/ui/button";

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

import { ChallengeForm }
from "@/components/admin/challenge-form";

type Props = {
  challenge: any;
  categories: any[];
};

export function EditChallengeModal({
  challenge,
  categories,
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
        `/api/admin/challenges/${challenge.id}`,
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
        "Challenge updated"
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
        `/api/admin/challenges/${challenge.id}`,
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
        "Challenge deleted"
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

        <DialogContent className="border-white/10 bg-zinc-950 text-white">

          <DialogHeader>

            <DialogTitle>
              Edit Challenge
            </DialogTitle>

          </DialogHeader>

          <ChallengeForm
            categories={categories}
            initialValues={{
              title:
                challenge.title,

              description:
                challenge.description,

              points:
                challenge.points,

              flag:
                challenge.flag,

              categoryId:
                challenge.categoryId,
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
              Delete Challenge
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