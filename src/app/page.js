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
    icon: <TrendingUp className="text-emerald-400" size={28} />,
    title: "AI-Powered Predictions",
    description:
      "XGBoost + Prophet models analyze your stocks and give BUY / SELL / NEUTRAL signals.",
  },
  {
    icon: <BarChart2 className="text-blue-400" size={28} />,
    title: "Portfolio Visualization",
    description:
      "See your allocation, P&L, and portfolio value trend in clean interactive charts.",
  },
  {
    icon: <ShieldCheck className="text-yellow-400" size={28} />,
    title: "Risk Analysis",
    description:
      "Get instant insights on concentration risk, volatility exposure, and diversification.",
  },
  {
    icon: <Zap className="text-purple-400" size={28} />,
    title: "Broker Integration",
    description:
      "Connect Angel One directly or upload your Zerodha CSV to load your real portfolio.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 gap-6">
        <span className="text-sm text-emerald-400 font-medium tracking-widest uppercase">
          AI-Enhanced Stock Portfolio Management
        </span>

        <h1 className="text-5xl font-bold leading-tight max-w-3xl">
          Your Portfolio,{" "}
          <span className="text-emerald-400">Smarter.</span>
        </h1>

        <p className="text-slate-400 text-lg max-w-xl">
          FinTrack combines real brokerage data with machine learning to give
          you predictions, risk insights, and portfolio analytics — all in one
          place.
        </p>

        <div className="flex gap-4 mt-4">
          <Link href="/register">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-5 text-base">
              Get Started Free
            </Button>
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:text-white px-8 py-5 text-base"
            >
              Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 pb-24">
        <h2 className="text-center text-2xl font-semibold text-slate-200 mb-10">
          Everything you need to invest smarter
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-slate-900 border-slate-800 hover:border-emerald-500 transition-all duration-200"
            >
              <CardContent className="p-6 flex flex-col gap-3">
                {feature.icon}
                <h3 className="text-white font-semibold text-base">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 text-center py-6 text-slate-500 text-sm">
        © 2025 FinTrack — Built for WCE Mini Project
      </footer>
    </main>
  );
}