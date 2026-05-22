import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 selection:bg-emerald-500/30">
      <Navbar />

      <section className="relative overflow-hidden pt-24 pb-32">
        {/* Background Effects */}
        {/* Radial Emerald Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />

        {/* Cyber Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center mt-12 sm:mt-20">

          <div className="max-w-4xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">

            {/* Glowing Badge */}
            <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)] backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Platform for Cybersecurity Enthusiasts
            </div>

            {/* Hero Title */}
            <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
              Ans
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                CTF
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-zinc-400">
              Train your cybersecurity skills through modern Capture The Flag challenges.
              Compete, learn, and climb the leaderboard.
            </p>

            {/* Call to Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300"
                >
                  Start Hacking
                </Button>
              </Link>
              <Link href="/challenges" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 rounded-full border-zinc-700 bg-zinc-950/50 text-zinc-300 hover:bg-zinc-800 hover:text-white backdrop-blur-sm transition-all duration-300"
                >
                  View Challenges
                </Button>
              </Link>
            </div>

          </div>

          {/* Decorative Terminal Mockup */}
          <div className="mt-20 w-full max-w-4xl rounded-xl border border-zinc-800/60 bg-zinc-900/50 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 border-b border-zinc-800/60 bg-zinc-950/50">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="mx-auto text-xs text-zinc-500 font-mono">root@ans-ctf:~</div>
            </div>
            {/* Terminal Body */}
            <div className="p-6 text-left font-mono text-sm sm:text-base text-zinc-300">
              <p><span className="text-emerald-400">root@ans-ctf:~$</span> ./start_challenge.sh</p>
              <p className="mt-2 text-zinc-500">[+] Initializing environment...</p>
              <p className="text-zinc-500">[+] Loading challenges...</p>
              <p className="mt-2 text-emerald-400">System Ready. Awaiting payload...</p>
              <p className="mt-2 animate-pulse">_</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}