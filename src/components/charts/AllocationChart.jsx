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
      <div className="bg-white border border-amber-200 rounded-xl p-5 min-h-[400px] md:min-h-[350px] animate-pulse" />
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
      <div className="bg-white border border-amber-200 rounded-xl p-5 flex items-center justify-center text-slate-400 text-sm min-h-[400px] md:min-h-[350px]">
        No holdings to display
      </div>
    );
  }

  return (
    <div className="bg-white border border-amber-200 rounded-xl p-4 sm:p-5 flex flex-col w-full h-full">
      <h2 className="text-slate-900 font-semibold text-sm sm:text-base mb-2">
        Portfolio Allocation
      </h2>

      {/* Increased height significantly to account for the massive 15-item legend.
        Using a wrapper div to handle the height dynamically.
      */}
      <div className="w-full h-[350px] sm:h-[400px] md:h-[350px] lg:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%" /* Lifted slightly above dead-center so the legend has room at the bottom */
              innerRadius={70}
              outerRadius={100}
              paddingAngle={
                2
              } /* Reduced padding angle slightly so thin slices don't disappear */
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
                padding: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: "#0f172a" }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                paddingTop:
                  "20px" /* Forces a gap between the Donut and the top of the Legend */,
                fontSize: "11px",
                lineHeight: "1.5",
              }}
              formatter={(value) => (
                <span className="text-slate-600 px-1">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
