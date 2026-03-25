import PortfolioTable from "@/components/portfolio/PortfolioTable";
import { mockPortfolio } from "@/lib/mockData";
import { Upload, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortfolioPage() {
  // Summary calculations from mock data
  const totalInvested = mockPortfolio.reduce(
    (sum, s) => sum + s.avgPrice * s.quantity,
    0
  );
  const totalCurrent = mockPortfolio.reduce(
    (sum, s) => sum + s.currentPrice * s.quantity,
    0
  );
  const totalPnl = totalCurrent - totalInvested;
  const totalPnlPercent = ((totalPnl / totalInvested) * 100).toFixed(2);

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 text-xl font-semibold mt-4">Portfolio</h1>
          <p className="text-slate-500 text-sm mt-1">
            Your current holdings and performance
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-amber-200 text-slate-700 hover:bg-amber-50 text-sm gap-2"
          >
            <Upload size={15} />
            Upload CSV
          </Button>
          <Button
            className="bg-slate-900 hover:bg-slate-800 text-white text-sm gap-2"
          >
            <RefreshCw size={15} />
            Sync Angel One
          </Button>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="bg-white border border-amber-200 rounded-xl px-6 py-4 flex gap-8">
        <div>
          <p className="text-slate-500 text-xs">Total Invested</p>
          <p className="text-slate-900 font-semibold text-base mt-0.5">
            ₹{totalInvested.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="w-px bg-amber-100" />
        <div>
          <p className="text-slate-500 text-xs">Current Value</p>
          <p className="text-slate-900 font-semibold text-base mt-0.5">
            ₹{totalCurrent.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="w-px bg-amber-100" />
        <div>
          <p className="text-slate-500 text-xs">Total P&L</p>
          <p
            className={`font-semibold text-base mt-0.5 ${totalPnl >= 0 ? "text-green-600" : "text-red-600"
              }`}
          >
            {totalPnl >= 0 ? "+" : ""}₹{totalPnl.toLocaleString("en-IN")}{" "}
            <span className="text-sm font-normal">
              ({totalPnl >= 0 ? "+" : ""}{totalPnlPercent}%)
            </span>
          </p>
        </div>
        <div className="w-px bg-amber-100" />
        <div>
          <p className="text-slate-500 text-xs">Holdings</p>
          <p className="text-slate-900 font-semibold text-base mt-0.5">
            {mockPortfolio.length} stocks
          </p>
        </div>
      </div>

      {/* Table */}
      <PortfolioTable data={mockPortfolio} />

    </div>
  );
}