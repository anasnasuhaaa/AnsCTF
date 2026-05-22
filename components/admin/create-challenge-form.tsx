"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  categories: {
    id: string;
    name: string;
  }[];
};

export function CreateChallengeModal({ categories }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    points: "",
    flag: "",
    categoryId: "",
  });

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          points: Number(form.points), // Pastikan points dikirim sebagai angka
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message || "Challenge created!");
      setOpen(false);
      setForm({ title: "", description: "", points: "", flag: "", categoryId: "" }); // Reset form
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
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

      {/* PERBAIKAN: Lebar sm:max-w-3xl, dengan batas tinggi max-h-[90vh] dan fungsi scroll */}
     <DialogContent className="border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl text-zinc-100 sm:max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-emerald-400">
            Create New Challenge
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="space-y-2.5">
            <Label className="text-zinc-300">Challenge Title</Label>
            <Input
              placeholder="e.g., Basic SQL Injection"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="h-11 bg-zinc-950/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400 text-zinc-200"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2.5">
              <Label className="text-zinc-300">Category</Label>
              <Select
                onValueChange={(value) => setForm({ ...form, categoryId: value })}
              >
                <SelectTrigger className="h-11 bg-zinc-950/50 border-zinc-800 focus:ring-1 focus:ring-emerald-400 text-zinc-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="border-zinc-800 bg-zinc-950 text-zinc-200">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="focus:bg-emerald-500/20 focus:text-emerald-400">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2.5">
              <Label className="text-zinc-300">Points</Label>
              <Input
                type="number"
                placeholder="100"
                value={form.points}
                onChange={(e) => setForm({ ...form, points: e.target.value })}
                className="h-11 bg-zinc-950/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400 text-zinc-200"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label className="text-zinc-300">Description</Label>
            <Textarea
              placeholder="Challenge description, context, and hints..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="min-h-[120px] bg-zinc-950/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400 text-zinc-200 leading-relaxed"
            />
          </div>

          <div className="space-y-2.5">
            <Label className="text-zinc-300">Flag</Label>
            <Input
              placeholder="AnsCTF{...}"
              value={form.flag}
              onChange={(e) => setForm({ ...form, flag: e.target.value })}
              className="h-11 font-mono text-emerald-400 bg-zinc-950/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400"
            />
          </div>

          <div className="pt-4 border-t border-zinc-800/60">
            <Button
              className="w-full h-11 bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Challenge"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}