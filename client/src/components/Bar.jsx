export default function Bar({ label, value, max, color }) {
  return (
    <div className="flex flex-col items-center justify-end h-full">
      <div
        className={`w-12 rounded-t-lg ${color}`}
        style={{ height: `${(value / max) * 100}%` }}
      />
      <p className="mt-2 text-sm font-semibold text-blue-900">{label}</p>
      <p className="text-xs text-blue-700">{value}</p>
    </div>
  );
}
