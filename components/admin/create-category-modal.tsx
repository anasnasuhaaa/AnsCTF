"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import { toast }
from "sonner";

import { Button }
from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CategoryForm }
from "@/components/admin/category-form";

export function CreateCategoryModal() {

  const router =
    useRouter();

  const [open, setOpen] =
    useState(false);

  async function handleSubmit(
    values: any
  ) {

    try {

      const res = await fetch(
        "/api/admin/categories",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(
        "Category created"
      );

      setOpen(false);

      router.refresh();

    } catch {

      toast.error(
        "Something went wrong"
      );

    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <Button>
          Create Category
        </Button>

      </DialogTrigger>

      <DialogContent className="border-white/10 bg-zinc-950 text-white">

        <DialogHeader>

          <DialogTitle>
            Create Category
          </DialogTitle>

        </DialogHeader>

        <CategoryForm
          onSubmit={handleSubmit}
        />

      </DialogContent>

    </Dialog>
  );
}