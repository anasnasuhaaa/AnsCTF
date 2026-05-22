"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  async function handleLogin() {

    setLoading(true);

    try {

      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      router.push("/challenges");

    } catch {

      toast.error("Something went wrong");

    } finally {

      setLoading(false);

    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">

      <Card className="w-full max-w-md border-white/10 bg-zinc-900 p-8">

        <h1 className="mb-6 text-3xl font-bold">
          Login
        </h1>

        <div className="space-y-5">

          <div>

            <Label>Username</Label>

            <Input
              className="mt-2"
              placeholder="johndoe"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
            />

          </div>

          <div>

            <Label>Password</Label>

            <Input
              type="password"
              className="mt-2"
              placeholder="********"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

          </div>

          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {
              loading
                ? "Loading..."
                : "Login"
            }
          </Button>

        </div>

      </Card>

    </main>
  );
}