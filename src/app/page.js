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
      <section className="flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-12 py-16 md:py-28 lg:py-36 gap-6 md:gap-8">
        <span className="text-xs sm:text-sm md:text-base text-slate-600 font-medium tracking-wide uppercase">
          Portfolio Management & Analytics
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight max-w-4xl">
          Smart investing<br />made simple.
        </h1>

        <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl px-2">
          Track your portfolio, get actionable insights, and make better investment decisions.
        </p>

        {/* Buttons stack vertically on mobile, horizontally on screens sm and up */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto px-4 sm:px-0">
          <Link href="/register" className="w-full sm:w-auto">
            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-base font-medium rounded-lg">
              Get Started
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full border-slate-300 text-slate-900 hover:bg-white px-8 py-6 text-base font-medium rounded-lg"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-8 md:px-12 py-16 md:py-24 lg:py-32 bg-white border-t border-amber-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 mb-12 md:mb-20">
            What you get
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center sm:items-start sm:text-left gap-4"
              >
                <div className="text-amber-700 bg-amber-50 p-3 rounded-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-slate-900 font-medium text-lg md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-200 text-center py-8 md:py-12 text-slate-500 text-sm bg-white">
        © 2025 FinTrack
      </footer>
    </main>
  );
}