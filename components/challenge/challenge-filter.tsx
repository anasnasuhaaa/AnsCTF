"use client";

import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export function ChallengeFilters({
  search,
  setSearch,
}: Props) {

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <Input
        placeholder="Search challenge..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="max-w-md border-white/10 bg-zinc-900"
      />

    </div>
  );
}