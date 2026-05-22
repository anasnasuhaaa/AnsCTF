"use client";

import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export function ChallengeFilters({ search, setSearch }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      
      <div className="relative w-full max-w-md group">
        {/* Search Icon */}
        <svg 
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <Input
          placeholder="Search challenge..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 w-full pl-10 bg-zinc-900/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:border-transparent transition-all text-zinc-200"
        />
      </div>

    </div>
  );
}