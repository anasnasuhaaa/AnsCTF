"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Pastikan Anda mengimpor komponen Label

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  categories: any[];
  onSubmit: (values: any) => Promise<void>;
  initialValues?: {
    title: string;
    description: string;
    points: number;
    flag: string;
    categoryId: string;
  };
};

export function ChallengeForm({ categories, onSubmit, initialValues }: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    points: initialValues?.points || 100,
    flag: initialValues?.flag || "",
    categoryId: initialValues?.categoryId || "",
  });

  async function handleSubmit() {
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      
      {/* Title Field */}
      <div className="space-y-2.5">
        <Label className="text-zinc-300">Challenge Title</Label>
        <Input
          placeholder="e.g., Basic SQL Injection"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="h-11 bg-zinc-950/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:border-transparent text-zinc-200 transition-all"
        />
      </div>

      {/* Category & Points in a Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2.5">
          <Label className="text-zinc-300">Category</Label>
          <Select
            value={form.categoryId}
            onValueChange={(value) => setForm({ ...form, categoryId: value })}
          >
            <SelectTrigger className="h-11 bg-zinc-950/50 border-zinc-800 focus:ring-1 focus:ring-emerald-400 text-zinc-200 transition-all">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="border-zinc-800 bg-zinc-950 text-zinc-200">
              {categories.map((category) => (
                <SelectItem 
                  key={category.id} 
                  value={category.id}
                  className="focus:bg-emerald-500/20 focus:text-emerald-400 cursor-pointer"
                >
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
            onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
            className="h-11 bg-zinc-950/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:border-transparent text-zinc-200 transition-all"
          />
        </div>
      </div>

      {/* Description Field */}
      <div className="space-y-2.5">
        <Label className="text-zinc-300">Description</Label>
        <Textarea
          placeholder="Describe the challenge scenario, provide links, and hints..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="min-h-[120px] resize-y bg-zinc-950/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:border-transparent text-zinc-200 transition-all leading-relaxed"
        />
      </div>

      {/* Flag Field */}
      <div className="space-y-2.5">
        <Label className="text-zinc-300">Flag</Label>
        <Input
          placeholder="AnsCTF{h4ck3r_m4n}"
          value={form.flag}
          onChange={(e) => setForm({ ...form, flag: e.target.value })}
          className="h-11 font-mono text-emerald-400 bg-zinc-950/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:border-transparent transition-all placeholder:text-zinc-600"
        />
        <p className="text-xs text-zinc-500">The exact string users need to submit to solve this challenge.</p>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-11 bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-zinc-950" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving changes...
            </span>
          ) : (
            "Save Challenge"
          )}
        </Button>
      </div>

    </div>
  );
}