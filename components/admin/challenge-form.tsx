"use client";

import { useState }
  from "react";

import { Input }
  from "@/components/ui/input";

import { Textarea }
  from "@/components/ui/textarea";

import { Button }
  from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  categories: any[];

  onSubmit: (
    values: any
  ) => Promise<void>;

  initialValues?: {
    title: string;
    description: string;
    points: number;
    flag: string;
    categoryId: string;
  };
};

export function ChallengeForm({
  categories,
  onSubmit,
  initialValues,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      title:
        initialValues?.title || "",

      description:
        initialValues?.description || "",

      points:
        initialValues?.points || 100,

      flag:
        initialValues?.flag || "",

      categoryId:
        initialValues?.categoryId || "",
    });

  async function handleSubmit() {

    setLoading(true);

    await onSubmit(form);

    setLoading(false);

  }

  return (
    <div className="space-y-5">

      <Input
        placeholder="Challenge title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title:
              e.target.value,
          })
        }
      />

      <Textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description:
              e.target.value,
          })
        }
      />

      <Input
        type="number"
        placeholder="Points"
        value={form.points}
        onChange={(e) =>
          setForm({
            ...form,
            points:
              Number(
                e.target.value
              ),
          })
        }
      />

      <Input
        placeholder="Flag"
        value={form.flag}
        onChange={(e) =>
          setForm({
            ...form,
            flag:
              e.target.value,
          })
        }
      />

      <Select
        value={form.categoryId}
        onValueChange={(value) =>
          setForm({
            ...form,
            categoryId: value,
          })
        }
      >

        <SelectTrigger>

          <SelectValue
            placeholder="Select category"
          />

        </SelectTrigger>

        <SelectContent>

          {categories.map(
            (category) => (

              <SelectItem
                key={category.id}
                value={category.id}
              >
                {category.name}
              </SelectItem>

            )
          )}

        </SelectContent>

      </Select>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full"
      >
        {
          loading
            ? "Loading..."
            : "Save Challenge"
        }
      </Button>

    </div>
  );
}