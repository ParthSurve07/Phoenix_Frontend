import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  BarChart2,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: <TrendingUp className="text-amber-700" size={24} />,
    title: "Stock Predictions",
    description:
      "Advanced analysis to help you make informed decisions on your portfolio.",
  },
  {
    icon: <BarChart2 className="text-amber-700" size={24} />,
    title: "Portfolio Tracking",
    description:
      "Monitor your allocation, returns, and portfolio performance in real-time.",
  },
  {
    icon: <ShieldCheck className="text-amber-700" size={24} />,
    title: "Risk Management",
    description:
      "Understand your exposure and optimize your portfolio diversification.",
  },
  {
    icon: <Zap className="text-amber-700" size={24} />,
    title: "Easy Integration",
    description:
      "Connect your broker directly or upload your portfolio data seamlessly.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-amber-50 text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 gap-6">
        <span className="text-xs text-slate-600 font-medium tracking-wide uppercase">
          Portfolio Management & Analytics
        </span>

        <h1 className="text-4xl sm:text-5xl font-light leading-tight max-w-3xl">
          Smart investing<br />made simple.
        </h1>

        <p className="text-slate-600 text-base max-w-xl">
          Track your portfolio, get actionable insights, and make better investment decisions.
        </p>

        <div className="flex gap-3 mt-6">
          <Link href="/register">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-sm font-medium rounded-lg">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="border-slate-300 text-slate-900 hover:bg-white px-8 py-6 text-sm font-medium rounded-lg"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white border-t border-amber-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl font-light text-slate-900 mb-16">
            What you get
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col gap-4"
              >
                <div className="text-amber-700">
                  {feature.icon}
                </div>
                <h3 className="text-slate-900 font-medium text-base">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-200 text-center py-8 text-slate-500 text-xs bg-white">
        © 2025 FinTrack
      </footer>
    </main>
  );
}