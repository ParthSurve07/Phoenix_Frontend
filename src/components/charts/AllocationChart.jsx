"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#92400e",
  "#b45309",
  "#d97706",
  "#f59e0b",
  "#fbbf24",
  "#cbd5e1",
];

export default function AllocationChart({ portfolio, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-amber-200 rounded-xl p-5 h-80 animate-pulse" />
    );
  }

  const holdings = portfolio || [];
  const totalValue = holdings.reduce((sum, h) => sum + h.marketValue, 0);

  const data = holdings.map((h) => ({
    name: h.symbol.replace("-EQ", ""),
    value: parseFloat(((h.marketValue / totalValue) * 100).toFixed(2)),
  }));

  if (data.length === 0) {
    return (
      <div className="bg-white border border-amber-200 rounded-xl p-5 flex items-center justify-center text-slate-400 text-sm h-80">
        No holdings to display
      </div>
    );
  }

  return (
    <div className="bg-white border border-amber-200 rounded-xl p-5">
      <h2 className="text-slate-900 font-semibold text-sm mb-4">
        Portfolio Allocation
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, "Allocation"]}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #fde68a",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-slate-600 text-xs">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
