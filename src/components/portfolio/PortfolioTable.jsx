"use client";
import { TrendingUp, TrendingDown } from "lucide-react";
import { getSector, sectorColors } from "@/lib/sectorMap";

export default function PortfolioTable({
  data,
  selectedIds,
  onSelectAll,
  onSelectOne,
}) {
  const totalValue = data.reduce((sum, s) => sum + s.marketValue, 0);
  const allSelected =
    data.length > 0 && data.every((h) => selectedIds.includes(h.id));

  return (
    <div className="bg-white border border-amber-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-amber-100 bg-amber-50">
            <th className="px-5 py-3 w-8">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="accent-slate-900 cursor-pointer"
              />
            </th>
            <th className="text-left px-5 py-3 text-slate-600 font-medium">
              Stock
            </th>
            <th className="text-right px-5 py-3 text-slate-600 font-medium">
              Qty
            </th>
            <th className="text-right px-5 py-3 text-slate-600 font-medium">
              Avg Price
            </th>
            <th className="text-right px-5 py-3 text-slate-600 font-medium">
              Current Price
            </th>
            <th className="text-right px-5 py-3 text-slate-600 font-medium">
              P&L
            </th>
            <th className="text-right px-5 py-3 text-slate-600 font-medium">
              Allocation
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((stock, i) => {
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
                <td className="px-5 py-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelectOne(stock.id, e.target.checked)}
                    className="accent-slate-900 cursor-pointer"
                  />
                </td>
                <td className="px-5 py-4">
                  <p className="text-slate-900 font-semibold">
                    {stock.symbol.replace("-EQ", "")}
                  </p>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full mt-0.5 inline-block ${sectorColors[getSector(stock.symbol)]?.bg} ${sectorColors[getSector(stock.symbol)]?.text}`}
                  >
                    {getSector(stock.symbol)}
                  </span>
                </td>
                <td className="px-5 py-4 text-right text-slate-700">
                  {stock.quantity}
                </td>
                <td className="px-5 py-4 text-right text-slate-700">
                  ₹{stock.avgPrice.toLocaleString("en-IN")}
                </td>
                <td className="px-5 py-4 text-right text-slate-900 font-medium">
                  ₹{stock.currentPrice.toLocaleString("en-IN")}
                </td>
                <td className="px-5 py-4 text-right">
                  <div
                    className={`flex items-center justify-end gap-1 font-medium ${isProfit ? "text-green-600" : "text-red-600"}`}
                  >
                    {isProfit ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    <span>
                      {isProfit ? "+" : ""}₹{stock.pnl.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-0.5 text-right ${isProfit ? "text-green-500" : "text-red-400"}`}
                  >
                    {isProfit ? "+" : ""}
                    {pnlPercent}%
                  </p>
                </td>
                <td className="px-5 py-4 text-right">
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
  );
}
