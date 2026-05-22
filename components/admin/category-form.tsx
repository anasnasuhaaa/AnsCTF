"use client";

import { useState }
from "react";

import { Input }
from "@/components/ui/input";

import { Button }
from "@/components/ui/button";

type Props = {
  onSubmit: (
    values: any
  ) => Promise<void>;

  initialValues?: {
    name: string;
  };
};

export function CategoryForm({
  onSubmit,
  initialValues,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState(
      initialValues?.name || ""
    );

  async function handleSubmit() {

    setLoading(true);

    await onSubmit({ name });

    setLoading(false);

  }

  return (
    <div className="space-y-5">

      <Input
        placeholder="Category name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full"
      >
        {
          loading
            ? "Loading..."
            : "Save Category"
        }
      </Button>

    </div>
  );
}