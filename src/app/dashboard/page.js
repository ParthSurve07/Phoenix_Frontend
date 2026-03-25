import SummaryCards from "@/components/portfolio/SummaryCards";
import AllocationChart from "@/components/charts/AllocationChart";

export default function DashboardPage() {
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
      <SummaryCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AllocationChart />

        {/* Placeholder for second chart */}
        <div className="bg-white border border-amber-200 rounded-xl p-5 flex items-center justify-center text-slate-400 text-sm">
          Portfolio Value Trend — Coming Soon
        </div>
      </div>

    </div>
  );
}