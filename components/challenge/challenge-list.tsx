"use client";

import { useMemo, useState } from "react";
import { ChallengeCard }
  from "@/components/challenge/challenge-card";
import { ChallengeFilters }
  from "@/components/challenge/challenge-filter";
import { Badge }
  from "@/components/ui/badge";

type Props = {
  challenges: any[];
};

export function ChallengeList({
  challenges,
}: Props) {

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const categories =
    useMemo(() => {

      const unique =
        new Set(
          challenges.map(
            (c) => c.category.name
          )
        );

      return [
        "All",
        ...Array.from(unique),
      ];

    }, [challenges]);

  const filteredChallenges =
    useMemo(() => {

      return challenges.filter(
        (challenge) => {

          const matchSearch =
            challenge.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchCategory =
            category === "All"
              ? true
              : challenge.category.name ===
              category;

          return (
            matchSearch &&
            matchCategory
          );
        }
      );

    }, [
      challenges,
      search,
      category,
    ]);

  return (
    <div>

      <ChallengeFilters
        search={search}
        setSearch={setSearch}
      />

      <div className="mb-8 flex flex-wrap gap-3">

        {categories.map((item) => (

          <button
            key={item}
            onClick={() =>
              setCategory(item)
            }
          >

            <Badge
              className={`
              cursor-pointer
              border
              px-4
              py-1
              transition

              ${category === item
                  ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                  : "border-white/10 bg-zinc-900 hover:bg-zinc-800"
                }
              `}
            >
              {item}
            </Badge>

          </button>

        ))}

      </div>

      {
        filteredChallenges.length === 0
          ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-zinc-500">

              No challenges found.

            </div>
          )
          : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

              {filteredChallenges.map(
                (challenge) => (

                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                  />

                )
              )}

            </div>
          )
      }

    </div>
  );
}