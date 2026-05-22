"use client";

import { useRouter }
from "next/navigation";

import { toast }
from "sonner";

type Props = {
  challengeId: string;
};

export function DeleteChallengeButton({
  challengeId,
}: Props) {

  const router =
    useRouter();

  async function handleDelete() {

    const confirmed =
      confirm(
        "Delete this challenge?"
      );

    if (!confirmed) return;

    try {

      const res = await fetch(
        `/api/admin/challenges/${challengeId}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      router.refresh();

    } catch {

      toast.error(
        "Something went wrong"
      );

    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-400 hover:text-red-300"
    >
      Delete
    </button>
  );
}