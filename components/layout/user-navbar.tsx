"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type Props = {
  username: string;
  role: string;
};

export function UserNavbar({ username, role }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    toast.success("Logout success");
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-500/10 bg-zinc-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Logo */}
        <Link
          href="/challenges"
          className="text-xl font-black tracking-tight text-white transition-transform hover:scale-105"
        >
          Ans<span className="text-emerald-400">CTF</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link 
              href="/challenges" 
              className="hover:text-emerald-400 transition-colors"
            >
              Challenges
            </Link>

            <Link 
              href="/leaderboard" 
              className="hover:text-emerald-400 transition-colors"
            >
              Leaderboard
            </Link>

            {role === "ADMIN" && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Dashboard
              </Link>
            )}
          </div>

          <div className="h-6 w-px bg-zinc-800"></div> {/* Divider */}

          {/* User Profile & Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                {username?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="text-sm font-medium text-zinc-300">
                {username}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="h-8 border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all"
            >
              Logout
            </Button>
          </div>

        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2 text-zinc-400 hover:text-emerald-400 focus:outline-none transition-colors"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-emerald-500/10 bg-zinc-950/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col px-6 py-6 space-y-4">
            
            {/* User Info (Mobile) */}
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/60">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-bold text-emerald-400 border border-emerald-500/20">
                {username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-xs text-zinc-500">Logged in as</p>
                <p className="text-sm font-medium text-zinc-200">@{username}</p>
              </div>
            </div>

            <Link 
              href="/challenges" 
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              Challenges
            </Link>

            <Link 
              href="/leaderboard" 
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              Leaderboard
            </Link>

            {role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Admin Dashboard
              </Link>
            )}

            <div className="pt-4">
              <Button
                variant="outline"
                className="w-full border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
}