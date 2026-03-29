"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  TrendingUp,
  User,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Portfolio", href: "/portfolio", icon: BriefcaseBusiness },
  { label: "Predictions", href: "/predictions", icon: TrendingUp },
  { label: "Profile", href: "/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-[9999] w-full h-16 bg-white shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] border-t border-amber-200 flex flex-row items-center justify-around px-2 py-1 md:fixed md:top-[65px] md:bottom-auto md:w-56 md:h-[calc(100vh-65px)] md:border-r md:border-t-0 md:flex-col md:justify-start md:items-stretch md:py-6 md:px-3 md:gap-1 transition-all duration-300 md:shadow-none">
      {navItems.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 p-2 md:px-3 md:py-2.5 rounded-lg text-[10px] md:text-sm font-medium transition-colors w-full
              ${
                isActive
                  ? "text-amber-700 md:bg-amber-50 md:border md:border-amber-200"
                  : "text-slate-500 hover:text-amber-700 md:text-slate-600 md:hover:bg-amber-50"
              }`}
          >
            <Icon size={20} className="md:w-[18px] md:h-[18px]" />
            <span className={`${isActive ? "font-semibold md:font-medium" : ""}`}>{label}</span>
          </Link>
        );
      })}
    </aside>
  );
}