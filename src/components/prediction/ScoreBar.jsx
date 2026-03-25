export default function ScoreBar({ value }) {
  const percent = Math.round(value * 100);

  const color =
    percent >= 60
      ? "bg-green-500"
      : percent >= 40
        ? "bg-amber-500"
        : "bg-red-400";

  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-slate-600 text-xs w-8">{percent}%</span>
    </div>
  );
}
