"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "TCS", value: 30 },
  { name: "INFY", value: 20 },
  { name: "HDFC", value: 18 },
  { name: "RELIANCE", value: 15 },
  { name: "WIPRO", value: 10 },
  { name: "Others", value: 7 },
];

// Warm neutral palette — fits amber theme
const COLORS = [
  "#92400e",
  "#b45309",
  "#d97706",
  "#f59e0b",
  "#fbbf24",
  "#cbd5e1",
];

export default function AllocationChart() {
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