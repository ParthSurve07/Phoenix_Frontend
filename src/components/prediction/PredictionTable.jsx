import SignalBadge from "./SignalBadge";
import ScoreBar from "./ScoreBar";
import { Clock } from "lucide-react";

export default function PredictionTable({ data }) {
  return (
    <div className="bg-white border border-amber-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-amber-100 bg-amber-50">
            <th className="text-left px-5 py-3 text-slate-600 font-medium">
              Stock
            </th>
            <th className="text-left px-5 py-3 text-slate-600 font-medium">
              ML Probability
            </th>
            <th className="text-left px-5 py-3 text-slate-600 font-medium">
              Trend Score
            </th>
            <th className="text-left px-5 py-3 text-slate-600 font-medium">
              Momentum Score
            </th>
            <th className="text-left px-5 py-3 text-slate-600 font-medium">
              Hybrid Score
            </th>
            <th className="text-left px-5 py-3 text-slate-600 font-medium">
              Signal
            </th>
            <th className="text-right px-5 py-3 text-slate-600 font-medium">
              Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((stock, i) => (
            <tr
              key={i}
              className="border-b border-amber-50 hover:bg-amber-50 transition-colors"
            >
              {/* Stock */}
              <td className="px-5 py-4">
                <p className="text-slate-900 font-semibold">{stock.symbol}</p>
                <p className="text-slate-400 text-xs mt-0.5">{stock.name}</p>
              </td>

              {/* ML Probability */}
              <td className="px-5 py-4">
                <ScoreBar value={stock.mlProbability} />
              </td>

              {/* Trend Score */}
              <td className="px-5 py-4">
                <ScoreBar value={stock.trendScore} />
              </td>

              {/* Momentum Score */}
              <td className="px-5 py-4">
                <ScoreBar value={stock.momentumScore} />
              </td>

              {/* Hybrid Score */}
              <td className="px-5 py-4">
                <ScoreBar value={stock.hybridScore} />
              </td>

              {/* Signal */}
              <td className="px-5 py-4">
                <SignalBadge signal={stock.signal} />
              </td>

              {/* Last Updated */}
              <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-1 text-slate-400 text-xs">
                  <Clock size={11} />
                  {stock.lastUpdated}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
