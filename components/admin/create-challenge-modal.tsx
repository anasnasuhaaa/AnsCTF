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

// IMPORT ChallengeForm yang sudah disempurnakan sebelumnya
import { ChallengeForm } from "@/components/admin/challenge-form";

type Props = {
  categories: {
    id: string;
    name: string;
  }[];
};

export function CreateChallengeModal({ categories }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Nilai form sekarang di-handle oleh <ChallengeForm />
  async function handleSubmit(values: any) {
    try {
      const res = await fetch("/api/admin/challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          points: Number(values.points), // Pastikan points berbentuk angka
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message || "Challenge created!");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
          Create Challenge
        </Button>
      </DialogTrigger>

      <DialogContent className="border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl text-zinc-100 sm:max-w-3xl">
        
        {/* Header Statis (Tidak ikut ter-scroll) */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-emerald-400">
            Create New Challenge
          </DialogTitle>
        </DialogHeader>

        {/* PERBAIKAN SCROLL: Dibungkus div khusus dengan max-h-[70vh] dan pr-2 (padding kanan agar scrollbar tidak menempel) */}
        <div className="mt-2 max-h-[70vh] overflow-y-auto pr-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500/50">
          
          <ChallengeForm 
            categories={categories} 
            onSubmit={handleSubmit} 
          />

        </div>

      </DialogContent>
    </Dialog>
  );
}