"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

import { ChallengeForm } from "@/components/admin/challenge-form";

type Props = {
  challenge: any;
  categories: any[];
};

export function EditChallengeModal({ challenge, categories }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleUpdate(values: any) {
    try {
      const res = await fetch(`/api/admin/challenges/${challenge.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Challenge updated");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(`/api/admin/challenges/${challenge.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Challenge deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
            Edit
          </button>
        </DialogTrigger>

        {/* PERBAIKAN: max-w-3xl untuk lebar, max-h-[90vh] dan overflow-y-auto untuk scroll */}
        <DialogContent className="border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl text-zinc-100 sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-emerald-400">
              Edit Challenge
            </DialogTitle>
          </DialogHeader>

          <div className="mt-2">
            <ChallengeForm
              categories={categories}
              initialValues={{
                title: challenge.title,
                description: challenge.description,
                points: challenge.points,
                flag: challenge.flag,
                categoryId: challenge.categoryId,
                attachmentUrl: challenge.attachmentUrl,
                attachmentName: challenge.attachmentName,
              }}
              onSubmit={handleUpdate}
            />
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="text-red-400 hover:text-red-300 transition-colors">
            Delete
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl text-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Delete Challenge</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              This action cannot be undone. This will permanently delete the challenge and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}