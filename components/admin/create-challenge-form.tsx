"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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

export function CreateChallengeForm({
  categories,
}: Props) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      points: "",
      flag: "",
      categoryId: "",
    });

  async function handleSubmit() {

    setLoading(true);

    try {

      const res = await fetch(
        "/api/admin/challenges",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      router.push(
        "/admin/challenges"
      );

      router.refresh();

    } catch {

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <Card className="max-w-2xl border-white/10 bg-zinc-900 p-8">

      <div className="space-y-5">

        <Input
          placeholder="Challenge title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <Textarea
          placeholder="Challenge description"
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
              points: e.target.value,
            })
          }
        />

        <Input
          placeholder="Flag"
          value={form.flag}
          onChange={(e) =>
            setForm({
              ...form,
              flag: e.target.value,
            })
          }
        />

        <Select
          onValueChange={(value) =>
            setForm({
              ...form,
              categoryId: value,
            })
          }
        >

          <SelectTrigger>

            <SelectValue placeholder="Select category" />

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
          className="w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {
            loading
              ? "Creating..."
              : "Create Challenge"
          }
        </Button>

      </div>

    </Card>
  );
}