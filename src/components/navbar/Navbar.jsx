import Link from "next/link";
import { Button } from "../ui/button";
import { TrendingUp } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 text-white font-bold text-xl">
        <TrendingUp className="text-emerald-400" size={24} />
        <span>FinTrack</span>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button variant="ghost" className="text-slate-300 hover:text-white">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}