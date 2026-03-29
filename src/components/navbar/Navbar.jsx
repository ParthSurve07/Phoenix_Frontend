import Link from "next/link";
import { Button } from "../ui/button";
import { TrendingUp } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-amber-200 bg-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 text-slate-900 font-semibold text-lg">
        <TrendingUp className="text-amber-700" size={24} />
        <span>FinTrack</span>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button
            variant="ghost"
            className="text-slate-600 hover:text-slate-900 hover:bg-amber-50"
          >
            Sign In
          </Button>
        </Link>
        <Link href="/register">
          <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}
