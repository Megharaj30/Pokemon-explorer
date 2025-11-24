export default function StatBar({ label, value }) {
  const percentage = Math.min((value / 150) * 100, 100); // cap at 100%

  return (
    <div className="w-full mb-3">
      {/* Label + Number */}
      <div className="flex justify-between text-xs md:text-sm mb-1">
        <span className="capitalize text-slate-200">{label}</span>
        <span className="font-semibold text-yellow-300">{value}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 md:h-3 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
