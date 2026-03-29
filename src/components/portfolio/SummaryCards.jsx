import { TrendingUp, TrendingDown, Wallet, BarChart2 } from "lucide-react";

export default function SummaryCards({ portfolio, isLoading }) {
  if (isLoading) {
    return (
      /* Fixed: Changed to a 2x2 grid on mobile (grid-cols-2) instead of a 1-column stack */
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-amber-200 rounded-xl p-4 sm:p-5 h-24 sm:h-28 animate-pulse shadow-sm"
          />
        ))}
      </div>
    );
  }

  const holdings = portfolio || [];
  const totalInvested = holdings.reduce(
    (sum, h) => sum + h.avgPrice * h.quantity,
    0,
  );
  const currentValue = holdings.reduce((sum, h) => sum + h.marketValue, 0);
  const totalPnl = holdings.reduce((sum, h) => sum + h.pnl, 0);
  const pnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  const cards = [
    {
      label: "Total Invested",
      value: `₹${totalInvested.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      icon: Wallet,
      sub: `Across ${holdings.length} stocks`,
    },
    {
      label: "Current Value",
      value: `₹${currentValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      icon: BarChart2,
      sub: `${totalPnl >= 0 ? "+" : ""}₹${totalPnl.toLocaleString("en-IN", { maximumFractionDigits: 0 })} overall`,
    },
    {
      label: "Total P&L",
      value: `${totalPnl >= 0 ? "+" : ""}₹${totalPnl.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      icon: totalPnl >= 0 ? TrendingUp : TrendingDown,
      positive: totalPnl >= 0,
      sub: `${pnlPercent >= 0 ? "+" : ""}${pnlPercent.toFixed(2)}% returns`,
    },
    {
      label: "Holdings",
      value: holdings.length.toString(),
      icon: BarChart2,
      sub: holdings.length > 0 ? `Last updated recently` : "No holdings yet",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            // Tightened padding and gap on mobile so it fits the 2-col layout beautifully
            className="bg-white border border-amber-200 rounded-xl p-3.5 sm:p-5 flex flex-col gap-1.5 sm:gap-3 shadow-sm"
          >
            <div className="flex items-start sm:items-center justify-between gap-1">
              <span className="text-slate-500 text-xs sm:text-sm font-medium leading-tight">
                {card.label}
              </span>
              <Icon className="text-amber-700 shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </div>

            <p
              // Scaled down the main value text slightly on mobile so large numbers like ₹100,000 don't break the box
              className={`text-lg sm:text-2xl font-semibold truncate ${
                card.positive === true
                  ? "text-green-600"
                  : card.positive === false
                    ? "text-red-600"
                    : "text-slate-900"
              }`}
            >
              {card.value}
            </p>

            <p className="text-slate-500 text-[10px] sm:text-xs truncate">
              {card.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}
