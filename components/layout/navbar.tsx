"use client";

import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-500/10 bg-zinc-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-tight text-white transition-transform hover:scale-105"
        >
          Ans<span className="text-emerald-400">CTF</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
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

          <Link 
            href="/login"
            className="rounded-full bg-emerald-500/10 px-5 py-2 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-zinc-950 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2 text-zinc-400 hover:text-emerald-400 focus:outline-none transition-colors"
        >
          {/* Ikon berubah dari hamburger ke X (close) berdasarkan state isOpen */}
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
          <nav className="flex flex-col px-6 py-6 space-y-4 text-sm font-medium text-zinc-400">
            <Link 
              href="/challenges" 
              onClick={() => setIsOpen(false)}
              className="block hover:text-emerald-400 transition-colors"
            >
              Challenges
            </Link>

            <Link 
              href="/leaderboard" 
              onClick={() => setIsOpen(false)}
              className="block hover:text-emerald-400 transition-colors"
            >
              Leaderboard
            </Link>

            <div className="pt-2">
              <Link 
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex w-full justify-center rounded-lg bg-emerald-500/10 px-5 py-3 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-zinc-950 transition-all"
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}