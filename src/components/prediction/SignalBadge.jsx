export default function SignalBadge({ signal }) {
  const styles = {
    BUY: "bg-green-50 text-green-700 border border-green-200",
    SELL: "bg-red-50 text-red-600 border border-red-200",
    NEUTRAL: "bg-amber-50 text-amber-700 border border-amber-300",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${styles[signal]}`}
    >
      {signal}
    </span>
  );
}
