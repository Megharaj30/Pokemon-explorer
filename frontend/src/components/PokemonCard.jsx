import typeColors from "../utils/typeColors";
import StatBar from "./StatBar.jsx";

export default function PokemonCard({ data }) {
  const {
    id,
    name,
    sprites,
    types,
    abilities,
    height,
    weight,
    stats,
    base_experience,
  } = data;

  return (
    <div
      className="w-full max-w-2xl bg-slate-900/70 backdrop-blur-xl 
                 rounded-3xl shadow-2xl border border-slate-700 p-6 
                 animate-fadeIn transform transition-transform duration-300 
                 hover:-translate-y-1 hover:scale-[1.02] 
                 hover:shadow-[0_25px_50px_rgba(15,23,42,0.9)] 
                 hover:border-yellow-400/60"
    >
      {/* Top Section: Image + Basic Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Pokémon Sprite */}
        <img
          src={sprites?.front_default}
          alt={name}
          className="w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl shrink-0"
        />

        {/* Basic Info */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold tracking-wide capitalize">
            {name}
          </h2>
          <p className="text-slate-300 text-lg">#{id}</p>

          {/* Types */}
          <div className="flex gap-2 mt-3 flex-wrap justify-center md:justify-start">
            {types.map((t) => (
              <span
                key={t}
                className="px-4 py-1 rounded-full text-white font-semibold shadow-md"
                style={{ backgroundColor: typeColors[t] || "#64748b" }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Height / Weight / Base XP */}
          <div className="mt-4 text-slate-300 space-y-1 text-sm md:text-base">
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
            <p>Base Experience: {base_experience}</p>
          </div>
        </div>
      </div>

      {/* Abilities */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Abilities</h3>
        <div className="flex gap-2 flex-wrap">
          {abilities.map((a) => (
            <span
              key={a.name}
              className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-sm"
            >
              {a.name}{" "}
              {a.is_hidden && (
                <span className="text-yellow-400">(Hidden)</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Stats using StatBar */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-3">Base Stats</h3>

        <div className="space-y-2">
          {stats.map((s) => (
            <StatBar key={s.name} label={s.name} value={s.base_stat} />
          ))}
        </div>
      </div>
    </div>
  );
}
