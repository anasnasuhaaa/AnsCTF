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

import { ChallengeForm }
from "@/components/admin/challenge-form";

type Props = {
  categories: any[];
};

export function CreateChallengeModal({
  categories,
}: Props) {

  const router =
    useRouter();

  const [open, setOpen] =
    useState(false);

  async function handleSubmit(
    values: any
  ) {

    try {

      const res = await fetch(
        "/api/admin/challenges",
        {
          method: "POST",
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
        "Challenge created"
      );

      setOpen(false);

      router.refresh();

    } catch {

      toast.error(
        "Something went wrong"
      );

    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <Button>
          Create Challenge
        </Button>

      </DialogTrigger>

      <DialogContent className="border-white/10 bg-zinc-950 text-white">

        <DialogHeader>

          <DialogTitle>
            Create Challenge
          </DialogTitle>

        </DialogHeader>

        <ChallengeForm
          categories={categories}
          onSubmit={handleSubmit}
        />

      </DialogContent>

    </Dialog>
  );
}