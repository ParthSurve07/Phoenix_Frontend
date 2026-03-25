import { AlertTriangle, Lightbulb } from "lucide-react";

export default function RiskInsightCard({ insight }) {
  const isWarning = insight.type === "warning";

  return (
    <div
      className={`bg-white border rounded-xl p-5 flex gap-4 ${
        isWarning ? "border-red-200" : "border-amber-200"
      }`}
    >
      {/* Icon */}
      <div
        className={`shrink-0 mt-0.5 ${
          isWarning ? "text-red-500" : "text-amber-700"
        }`}
      >
        {isWarning ? <AlertTriangle size={18} /> : <Lightbulb size={18} />}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <p
          className={`text-sm font-semibold ${
            isWarning ? "text-red-700" : "text-slate-900"
          }`}
        >
          {insight.title}
        </p>
        <p className="text-slate-500 text-sm leading-relaxed">
          {insight.description}
        </p>
      </div>
    </div>
  );
}
