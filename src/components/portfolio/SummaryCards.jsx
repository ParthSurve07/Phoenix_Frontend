import { TrendingUp, TrendingDown, Wallet, BarChart2 } from "lucide-react";

export default function SummaryCards({ portfolio, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-amber-200 rounded-xl p-5 h-28 animate-pulse"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="bg-white border border-amber-200 rounded-xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-sm">{card.label}</span>
              <Icon size={18} className="text-amber-700" />
            </div>
            <p
              className={`text-2xl font-semibold ${
                card.positive === true
                  ? "text-green-600"
                  : card.positive === false
                    ? "text-red-600"
                    : "text-slate-900"
              }`}
            >
              {card.value}
            </p>
            <p className="text-slate-500 text-xs">{card.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
