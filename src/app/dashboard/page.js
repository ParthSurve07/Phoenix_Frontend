"use client";

import { usePortfolio } from "@/hooks/usePortfolio";
import { useRisk } from "@/hooks/useRisk";
import SummaryCards from "@/components/portfolio/SummaryCards";
import AllocationChart from "@/components/charts/AllocationChart";
import RiskInsightCard from "@/components/risk/RiskInsightCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio();
  const { data: risk, isLoading: riskLoading } = useRisk();

  const previewInsights = risk?.insights?.slice(0, 2) || [];

  return (
    <div className="flex flex-col gap-6">
      {/* Page Title */}
      <div>
        <h1 className="text-slate-900 text-xl font-semibold mt-4">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Your portfolio overview at a glance
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards portfolio={portfolio} isLoading={portfolioLoading} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AllocationChart portfolio={portfolio} isLoading={portfolioLoading} />
        <div className="bg-white border border-amber-200 rounded-xl p-5 flex items-center justify-center text-slate-400 text-sm">
          Portfolio Value Trend — Coming Soon
        </div>
      </div>

      {/* Risk Preview */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-slate-900 font-semibold text-sm">Risk Insights</h2>
          <Link
            href="/predictions"
            className="text-amber-700 text-xs flex items-center gap-1 hover:underline"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {riskLoading ? (
          <p className="text-slate-400 text-sm">Loading risk insights...</p>
        ) : !risk ? (
          <p className="text-slate-400 text-sm">
            No risk analysis yet.{" "}
            <Link href="/predictions" className="text-amber-700 hover:underline">
              Run analysis →
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {previewInsights.map((insight, i) => (
              <RiskInsightCard key={i} insight={insight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}