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
    <div className="bg-white border border-amber-200 rounded-xl px-6 py-5 flex items-center gap-8">
      {/* Score */}
      <div className="shrink-0">
        <p className="text-slate-500 text-xs mb-1">Risk Score</p>
        <p className={`text-4xl font-bold ${color}`}>{data.riskScore}</p>
        <p className={`text-sm font-medium mt-0.5 ${color}`}>
          {data.overallRisk} Risk
        </p>
      </div>

      <div className="w-px bg-amber-100 self-stretch" />

      {/* Bar + Summary */}
      <div className="flex flex-col gap-3 flex-1">
        <p className="text-slate-600 text-sm leading-relaxed">{data.summary}</p>
        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${barColor}`}
            style={{ width: `${data.riskScore}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>Low Risk</span>
          <span>Moderate</span>
          <span>High Risk</span>
        </div>
      </div>
    </div>
  );
}
