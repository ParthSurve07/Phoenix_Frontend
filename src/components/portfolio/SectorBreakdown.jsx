"use client";
import { getSector, sectorColors } from "@/lib/sectorMap";

export default function SectorBreakdown({ portfolio }) {
  if (!portfolio || portfolio.length === 0) return null;

  const totalValue = portfolio.reduce((sum, h) => sum + h.marketValue, 0);

  // Group by sector
  const sectorData = portfolio.reduce((acc, holding) => {
    const sector = getSector(holding.symbol);
    if (!acc[sector]) acc[sector] = { value: 0, count: 0, holdings: [] };
    acc[sector].value += holding.marketValue;
    acc[sector].count += 1;
    acc[sector].holdings.push(holding.symbol.replace("-EQ", ""));
    return acc;
  }, {});

  // Sort by value descending
  const sorted = Object.entries(sectorData).sort(
    (a, b) => b[1].value - a[1].value,
  );

  return (
    <div className="bg-white border border-amber-200 rounded-xl p-4 sm:p-5 flex flex-col gap-4 shadow-sm">
      <h2 className="text-slate-900 font-semibold text-sm sm:text-base">
        Sector Breakdown
      </h2>

      <div className="flex flex-col gap-4 sm:gap-3">
        {sorted.map(([sector, data]) => {
          const allocation = ((data.value / totalValue) * 100).toFixed(1);
          const colors = sectorColors[sector] || sectorColors["Other"];

          return (
            <div key={sector} className="flex flex-col gap-1.5 sm:gap-2">
              {/* Changed to flex-col on mobile so long lists of holdings don't break layout */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
                  <span
                    className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full w-max ${colors.bg} ${colors.text}`}
                  >
                    {sector}
                  </span>
                  {/* Added break-words so massive lists wrap neatly */}
                  <span className="text-slate-400 text-xs break-words line-clamp-2 sm:line-clamp-none">
                    {data.holdings.join(", ")}
                  </span>
                </div>
                <span className="text-slate-700 text-xs sm:text-sm font-medium self-end sm:self-auto shrink-0">
                  {allocation}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1.5 sm:h-2 bg-amber-50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${allocation}%`,
                    backgroundColor: colors.bar,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
