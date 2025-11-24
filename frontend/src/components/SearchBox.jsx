export default function SearchBox({ value, onChange, onSearch, onRandom }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-3 bg-slate-800/60 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-slate-700">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search Pokémon (e.g., pikachu)…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-4 py-2 text-white bg-slate-900/60 
                   border border-slate-700 rounded-xl focus:outline-none 
                   focus:ring-2 focus:ring-yellow-400 
                   placeholder:text-slate-400"
      />

      {/* Buttons */}
      <div className="flex gap-2 justify-end sm:justify-start">
        <button
          onClick={onSearch}
          className="px-4 sm:px-5 py-2 bg-yellow-400 hover:bg-yellow-300 
                     text-black font-bold rounded-xl 
                     transition-all active:scale-95 
                     shadow-yellow-500/30 shadow-lg"
        >
          Search
        </button>
        <button
          onClick={onRandom}
          className="px-4 sm:px-5 py-2 bg-sky-500 hover:bg-sky-400 
                     text-black font-semibold rounded-xl 
                     transition-all active:scale-95 
                     shadow-sky-500/30 shadow-lg"
        >
          Random
        </button>
      </div>
    </div>
  );
}
