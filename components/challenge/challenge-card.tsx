"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  challenge: any;
};

export function ChallengeCard({ challenge }: Props) {
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(false);

  const solved = challenge.solves.length > 0;

  async function handleSubmit() {
    setLoading(true);

    try {
      const res = await fetch("/api/challenges/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challengeId: challenge.id,
          flag,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.type === "already_wrong") {
          toast.warning(data.message);
          return;
        }
        toast.error(data.message);
        return;
      }

      if (data.type === "already_correct") {
        toast.info(data.message);
        return;
      }

      toast.success(data.message);
      setFlag("");
      setOpen(false); // Tutup modal otomatis jika benar
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`group relative flex min-h-[220px] w-full flex-col justify-between overflow-hidden rounded-2xl border p-6 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
          solved 
            ? "border-emerald-500/50 bg-emerald-500/5 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]" 
            : "border-zinc-800/60 bg-zinc-900/50 hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
        }`}
      >
        {/* Subtle hover glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-emerald-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

        <div className="relative z-10 w-full">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
              {challenge.title}
            </h2>
            
            {/* Points / Solved Badge */}
            <div className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${
              solved 
                ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400" 
                : "border-zinc-700 bg-zinc-800 text-zinc-300"
            }`}>
              {solved ? (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Solved
                </span>
              ) : (
                `${challenge.points} pts`
              )}
            </div>
          </div>

          {/* Category Badge */}
          <div className="inline-flex items-center rounded bg-zinc-800/50 px-2 py-1 text-xs font-medium text-zinc-400 border border-zinc-700/50">
            {challenge.category.name}
          </div>
        </div>

        {/* Footer Area of the card */}
        <div className="relative z-10 mt-6 flex w-full items-center justify-between border-t border-zinc-800/50 pt-4">
          <span className="text-xs font-medium text-zinc-500 transition-colors group-hover:text-emerald-500">
            {solved ? "Review challenge" : "Open challenge"}
          </span>
          <svg 
            className="h-4 w-4 text-zinc-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-500" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </button>

      {/* Dialog / Modal Section */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl text-zinc-100 sm:max-w-lg">
          
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
              {solved && (
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {challenge.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-2">
            
            {/* Description Block */}
            <div className="rounded-lg bg-zinc-900/50 p-4 border border-zinc-800/50 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {challenge.description}
            </div>

            {/* Input & Submit */}
            <div className="space-y-3">
              <Input
                placeholder="AnsCTF{...}"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                className="h-12 bg-zinc-950 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:border-transparent transition-all font-mono text-zinc-200"
              />
              <Button
                className="w-full h-12 bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-zinc-950" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Payload...
                  </span>
                ) : (
                  "Submit Flag"
                )}
              </Button>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}