"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Navbar } from "@/components/layout/navbar"; // Import Navbar
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  async function handleRegister() {
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      router.push("/login");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-zinc-950 overflow-hidden text-zinc-100">

      {/* Navbar di posisi paling atas */}
      <Navbar />

      {/* Kontainer form yang mengambil sisa ruang layar dan memusatkan isinya */}
      <div className="relative flex flex-1 items-center justify-center px-4 py-12">

        {/* Subtle Emerald Background Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <Card className="relative w-full max-w-md border border-emerald-500/20 bg-zinc-900/50 backdrop-blur-xl p-8 sm:p-10 shadow-2xl rounded-2xl">

          {/* Header Section */}
          <div className="mb-8 flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-emerald-400">
              Create an account
            </h1>
            <p className="text-sm text-zinc-400">
              Enter your details to get started
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-2.5">
              <Label className="text-zinc-300">Username</Label>
              <Input
                className="h-11 bg-zinc-950/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:border-transparent transition-all"
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

            <div className="space-y-2.5">
              <Label className="text-zinc-300">Password</Label>
              <Input
                type="password"
                className="h-11 bg-zinc-950/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:border-transparent transition-all"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2.5">
              <Label className="text-zinc-300">Confirm Password</Label>
              <Input
                type="password"
                className="h-11 bg-zinc-950/50 border-zinc-800 focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:border-transparent transition-all"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>

            <Button
              className="w-full h-11 bg-emerald-400 text-zinc-950 hover:bg-emerald-300 font-medium transition-colors"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-zinc-950" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-emerald-400 hover:text-emerald-300 hover:underline underline-offset-4 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}