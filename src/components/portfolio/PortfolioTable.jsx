"use client";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";
import { getSector, sectorColors } from "@/lib/sectorMap";

const SortIcon = ({ column, sortConfig }) => {
  if (sortConfig.key !== column)
    return <ChevronsUpDown size={13} className="text-slate-400" />;
  return sortConfig.direction === "asc" ? (
    <ChevronUp size={13} className="text-slate-700" />
  ) : (
    <ChevronDown size={13} className="text-slate-700" />
  );
};

export default function PortfolioTable({
  data,
  selectedIds,
  onSelectAll,
  onSelectOne,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const totalValue = data.reduce((sum, s) => sum + s.marketValue, 0);
  const allSelected =
    data.length > 0 && data.every((h) => selectedIds.includes(h.id));

  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const dir = sortConfig.direction === "asc" ? 1 : -1;

    switch (sortConfig.key) {
      case "symbol":
        return dir * a.symbol.localeCompare(b.symbol);
      case "quantity":
        return dir * (a.quantity - b.quantity);
      case "avgPrice":
        return dir * (a.avgPrice - b.avgPrice);
      case "currentPrice":
        return dir * (a.currentPrice - b.currentPrice);
      case "pnl":
        return dir * (a.pnl - b.pnl);
      case "allocation":
        return dir * (a.marketValue - b.marketValue);
      default:
        return 0;
    }
  });

  const SortableHeader = ({ label, column, className = "text-right" }) => (
    <th
      className={`px-4 sm:px-5 py-3 text-slate-600 font-medium cursor-pointer select-none whitespace-nowrap ${className}`}
      onClick={() => handleSort(column)}
    >
      <div
        className={`flex items-center gap-1 ${className === "text-right" ? "justify-end" : ""}`}
      >
        {label}
        <SortIcon column={column} sortConfig={sortConfig} />
      </div>
    </th>
  );

  return (
    <div className="bg-white border border-amber-200 rounded-xl overflow-hidden shadow-sm">
      {/* Added overflow-x-auto to allow horizontal scrolling on small screens without breaking layout */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-amber-100 bg-amber-50">
              <th className="px-4 sm:px-5 py-3 w-8">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="accent-slate-900 cursor-pointer"
                />
              </th>
              <SortableHeader
                label="Stock"
                column="symbol"
                className="text-left"
              />
              <SortableHeader label="Qty" column="quantity" />
              <SortableHeader label="Avg Price" column="avgPrice" />
              <SortableHeader label="Current Price" column="currentPrice" />
              <SortableHeader label="P&L" column="pnl" />
              <SortableHeader label="Allocation" column="allocation" />
            </tr>
          </thead>
          <tbody>
            {sortedData.map((stock, i) => {
              const isProfit = stock.pnl >= 0;
              const allocation =
                totalValue > 0
                  ? ((stock.marketValue / totalValue) * 100).toFixed(1)
                  : 0;
              const invested = stock.avgPrice * stock.quantity;
              const pnlPercent =
                invested > 0 ? ((stock.pnl / invested) * 100).toFixed(2) : 0;
              const isSelected = selectedIds.includes(stock.id);

              return (
                <tr
                  key={i}
                  className={`border-b border-amber-50 transition-colors ${
                    isSelected ? "bg-amber-50" : "hover:bg-amber-50"
                  }`}
                >
                  <td className="px-4 sm:px-5 py-3 sm:py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => onSelectOne(stock.id, e.target.checked)}
                      className="accent-slate-900 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 sm:px-5 py-3 sm:py-4">
                    <p className="text-slate-900 font-semibold whitespace-nowrap">
                      {stock.symbol.replace("-EQ", "")}
                    </p>
                    <span
                      className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full mt-0.5 inline-block whitespace-nowrap ${sectorColors[getSector(stock.symbol)]?.bg} ${sectorColors[getSector(stock.symbol)]?.text}`}
                    >
                      {getSector(stock.symbol)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-5 py-3 sm:py-4 text-right text-slate-700 whitespace-nowrap">
                    {stock.quantity}
                  </td>
                  <td className="px-4 sm:px-5 py-3 sm:py-4 text-right text-slate-700 whitespace-nowrap">
                    ₹{stock.avgPrice.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 sm:px-5 py-3 sm:py-4 text-right text-slate-900 font-medium whitespace-nowrap">
                    ₹{stock.currentPrice.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 sm:px-5 py-3 sm:py-4 text-right whitespace-nowrap">
                    <div
                      className={`flex items-center justify-end gap-1 font-medium ${isProfit ? "text-green-600" : "text-red-600"}`}
                    >
                      {isProfit ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      <span>
                        {isProfit ? "+" : ""}₹
                        {stock.pnl.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-0.5 text-right ${isProfit ? "text-green-500" : "text-red-400"}`}
                    >
                      {isProfit ? "+" : ""}
                      {pnlPercent}%
                    </p>
                  </td>
                  <td className="px-4 sm:px-5 py-3 sm:py-4 text-right whitespace-nowrap">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-slate-700">{allocation}%</span>
                      <div className="w-16 h-1.5 bg-amber-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-600 rounded-full"
                          style={{ width: `${allocation}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
