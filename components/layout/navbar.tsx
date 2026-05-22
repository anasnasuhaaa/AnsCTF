import Link from "next/link";

export function Navbar() {
  return (
    <header className="
sticky
top-0
z-50
border-b
border-white/10
bg-zinc-950/70
backdrop-blur-xl
">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-xl font-bold"
        >
          AnsCTF
        </Link>

        <nav className="flex items-center gap-6 text-sm text-zinc-300">

          <Link href="/challenges">
            Challenges
          </Link>

          <Link href="/leaderboard">
            Leaderboard
          </Link>

          <Link href="/login">
            Login
          </Link>

        </nav>

      </div>
    </header>
  );
}