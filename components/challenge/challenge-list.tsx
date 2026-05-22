"use client";

import { useMemo, useState } from "react";
import { ChallengeCard } from "@/components/challenge/challenge-card";
import { ChallengeFilters } from "@/components/challenge/challenge-filter";

type Props = {
  challenges: any[];
};

export function ChallengeList({ challenges }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = new Set(challenges.map((c) => c.category.name));
    return ["All", ...Array.from(unique)];
  }, [challenges]);

  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      const matchSearch = challenge.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" ? true : challenge.category.name === category;
      return matchSearch && matchCategory;
    });
  }, [challenges, search, category]);

  return (
    <div>
      <ChallengeFilters search={search} setSearch={setSearch} />

      {/* Category Pills */}
      <div className="mb-8 flex flex-wrap gap-2 sm:gap-3">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
              category === item
                ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                : "border-zinc-800/60 bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Challenge Grid / Empty State */}
      {filteredChallenges.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center rounded-2xl border border-zinc-800/60 bg-zinc-900/20 backdrop-blur-sm">
          <div className="h-12 w-12 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4 border border-zinc-700/50">
            <svg className="h-6 w-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-zinc-400 font-medium">No challenges found.</p>
          <p className="text-zinc-500 text-sm mt-1">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}
    </div>
  );
}