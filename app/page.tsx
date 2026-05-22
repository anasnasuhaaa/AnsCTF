import Link from "next/link";

import { Navbar } from "@/components/layout/navbar";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950">

      <Navbar />
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_35%)]" />

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-36 text-center">

          <div className="max-w-4xl">

            <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1 text-sm text-emerald-400">
              Modern Competitive Cybersecurity Platform
            </div>

            <h1 className="mt-8 text-6xl font-black tracking-tight sm:text-8xl">

              Ans
              <span className="text-emerald-400">
                CTF
              </span>

            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">

              Train your cybersecurity skills
              through modern Capture The Flag
              challenges.

            </p>

          </div>

        </div>

      </section>

    </main>
  );
}