"use client";

import { useState } from "react";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

type Props = {
  challenge: any;
};

export function ChallengeCard({
  challenge,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const [flag, setFlag] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {

    setLoading(true);

    try {

      const res = await fetch(
        "/api/challenges/submit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            challengeId:
              challenge.id,
            flag,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {

        if (
          data.type === "already_wrong"
        ) {

          toast.warning(
            data.message
          );

          return;
        }

        toast.error(
          data.message
        );

        return;
      }

      if (
        data.type === "already_correct"
      ) {

        toast.info(
          data.message
        );

        return;
      }

      toast.success(
        data.message
      );
      setFlag("");

    } catch {

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  }

  const solved =
    challenge.solves.length > 0;
  return (
    <>
      <Badge
        variant={
          solved
            ? "default"
            : "secondary"
        }
      >
        {
          solved
            ? "Solved"
            : `${challenge.points} pts`
        }
      </Badge>
      <button
        onClick={() => setOpen(true)}
        className="
  group
  relative
  flex
  min-h-[180px]
  flex-col
  justify-between
  overflow-hidden
  rounded-2xl
  border
  border-white/10
  bg-zinc-900/70
  p-6
  text-left
  backdrop-blur
  transition-all
  duration-300
  hover:-translate-y-1
  hover:border-emerald-500/40
  hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]
  "
      >

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-10">

          <div className="mb-4 flex items-start justify-between gap-4">

            <h2 className="text-2xl font-bold tracking-tight">
              {challenge.title}
            </h2>

            <Badge
              className="
        shrink-0
        border
        border-white/10
        bg-white/5
        px-3
        py-1
        backdrop-blur
        "
            >
              {
                solved
                  ? "Solved"
                  : `${challenge.points} pts`
              }
            </Badge>

          </div>

          <p className="text-sm text-zinc-400">
            {challenge.category.name}
          </p>

        </div>

        <div className="relative z-10 mt-6 flex items-center justify-between">

          <div className="text-sm text-zinc-500">
            Click to open challenge
          </div>

        </div>

      </button>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >

        <DialogContent className="border-white/10 bg-zinc-900 text-white">

          <DialogHeader>

            <DialogTitle>
              {challenge.title}
            </DialogTitle>

          </DialogHeader>

          <div className="space-y-5">

            <p className="text-zinc-400">
              {challenge.description}
            </p>

            <Input
              placeholder="AnsCTF{...}"
              value={flag}
              onChange={(e) =>
                setFlag(
                  e.target.value
                )
              }
            />

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {
                loading
                  ? "Submitting..."
                  : "Submit Flag"
              }
            </Button>

          </div>

        </DialogContent>

      </Dialog>
    </>
  );
}