export default function RiskScoreBanner({ data }) {
  const color =
    data.riskScore >= 70
      ? "text-red-600"
      : data.riskScore >= 40
        ? "text-amber-700"
        : "text-green-600";

  const barColor =
    data.riskScore >= 70
      ? "bg-red-400"
      : data.riskScore >= 40
        ? "bg-amber-500"
        : "bg-green-500";

  return (
    <div className="bg-white border border-amber-200 rounded-xl p-5 sm:px-6 sm:py-5 flex flex-col sm:flex-row items-center sm:items-stretch gap-6 sm:gap-8 shadow-sm">
      {/* Score Section - Centered on mobile, left-aligned on desktop */}
      <div className="shrink-0 text-center sm:text-left">
        <p className="text-slate-500 text-xs mb-1">Risk Score</p>
        <p className={`text-4xl sm:text-5xl font-bold ${color}`}>
          {data.riskScore}
        </p>
        <p className={`text-sm font-medium mt-0.5 ${color}`}>
          {data.overallRisk} Risk
        </p>
      </div>

      {/* Vertical divider for Desktop */}
      <div className="hidden sm:block w-px bg-amber-100 self-stretch" />

      {/* Horizontal divider for Mobile */}
      <div className="block sm:hidden w-full h-px bg-amber-100" />

      {/* Bar + Summary */}
      <div className="flex flex-col gap-4 sm:gap-3 flex-1 w-full">
        <p className="text-slate-600 text-sm leading-relaxed text-center sm:text-left">
          {data.summary}
        </p>

        {/* Progress bar container */}
        <div className="flex flex-col gap-2">
          <div className="w-full h-2.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${barColor}`}
              style={{ width: `${data.riskScore}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] sm:text-xs text-slate-400 font-medium">
            <span>Low Risk</span>
            <span>Moderate</span>
            <span>High Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
