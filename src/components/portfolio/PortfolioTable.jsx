"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

export default function PortfolioTable({ data }) {
  return (
    <div className="bg-white border border-amber-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-amber-100 bg-amber-50">
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
            return (
              <tr
                key={i}
                className="border-b border-amber-50 hover:bg-amber-50 transition-colors"
              >
                {/* Stock Name */}
                <td className="px-5 py-4">
                  <p className="text-slate-900 font-semibold">{stock.symbol}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{stock.name}</p>
                </td>

                {/* Quantity */}
                <td className="px-5 py-4 text-right text-slate-700">
                  {stock.quantity}
                </td>

                {/* Avg Price */}
                <td className="px-5 py-4 text-right text-slate-700">
                  ₹{stock.avgPrice.toLocaleString("en-IN")}
                </td>

                {/* Current Price */}
                <td className="px-5 py-4 text-right text-slate-900 font-medium">
                  ₹{stock.currentPrice.toLocaleString("en-IN")}
                </td>

                {/* P&L */}
                <td className="px-5 py-4 text-right">
                  <div
                    className={`flex items-center justify-end gap-1 font-medium ${
                      isProfit ? "text-green-600" : "text-red-600"
                    }`}
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
                    className={`text-xs mt-0.5 text-right ${
                      isProfit ? "text-green-500" : "text-red-400"
                    }`}
                  >
                    {isProfit ? "+" : ""}
                    {stock.pnlPercent}%
                  </p>
                </td>

                {/* Allocation */}
                <td className="px-5 py-4 text-right">
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-slate-700">{stock.allocation}%</span>
                    {/* Mini progress bar */}
                    <div className="w-16 h-1.5 bg-amber-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-600 rounded-full"
                        style={{ width: `${stock.allocation}%` }}
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
