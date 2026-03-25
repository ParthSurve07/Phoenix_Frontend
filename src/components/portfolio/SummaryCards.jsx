import { TrendingUp, TrendingDown, Wallet, BarChart2 } from "lucide-react";

const cards = [
  {
    label: "Total Invested",
    value: "₹1,20,000",
    icon: Wallet,
    sub: "Across 6 stocks",
  },
  {
    label: "Current Value",
    value: "₹1,34,500",
    icon: BarChart2,
    sub: "+₹14,500 overall",
  },
  {
    label: "Total P&L",
    value: "+₹14,500",
    icon: TrendingUp,
    positive: true,
    sub: "+12.08% returns",
  },
  {
    label: "Today's Change",
    value: "-₹320",
    icon: TrendingDown,
    positive: false,
    sub: "-0.23% today",
  },
];

export default function SummaryCards() {
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
