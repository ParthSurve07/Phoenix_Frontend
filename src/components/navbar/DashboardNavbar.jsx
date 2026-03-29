import { TrendingUp, Bell, User } from "lucide-react";
import Link from "next/link";

export default function DashboardNavbar() {
  return (
    <header className="w-full bg-white border-b border-amber-200 px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 text-slate-900 font-bold text-xl">
        <TrendingUp className="text-amber-700" size={22} />
        <span>FinTrack</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="text-slate-500 hover:text-amber-700 transition-colors">
          <Bell size={20} />
        </button>
        <Link
          href="/profile"
          className="text-slate-500 hover:text-amber-700 transition-colors"
        >
          <User size={20} />
        </Link>
      </div>
    </header>
  );
}
