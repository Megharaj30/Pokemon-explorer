import { useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox.jsx";
import PokemonCard from "./components/PokemonCard.jsx";
import Loader from "./components/Loader.jsx";
import usePokemon from "./hooks/usePokemon.js";

export default function App() {
  const [query, setQuery] = useState("");
  const {
    loading,
    error,
    pokemon,
    fetchPokemon,
    fetchRandomPokemon,
  } = usePokemon();

  const handleSearch = () => {
    if (!query.trim()) return;
    fetchPokemon(query.trim().toLowerCase());
  };

  const handleRandom = () => {
    fetchRandomPokemon();
    setQuery(""); // clear manual input when randomizing
  };

  return (
    <div className="app-root min-h-screen px-4 py-8 text-white">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="app-title text-4xl md:text-5xl font-extrabold tracking-wide mb-2">
          Pokédex Search
        </h1>
        <p className="app-subtitle text-slate-200 text-sm md:text-base">
          Search Pokémon by name or discover one at random. View stats, types, and abilities in a sleek UI.
        </p>
      </header>

      {/* Search Box */}
      <section className="max-w-2xl mx-auto">
        <SearchBox
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          onRandom={handleRandom}
        />
      </section>

      {/* Status (Loader / Error) */}
      <section className="mt-6 flex justify-center min-h-[32px]">
        {loading && <Loader />}
        {!loading && error && (
          <div className="text-center text-red-400 text-base md:text-lg font-medium">
            {error}
          </div>
        )}
      </section>

      {/* Pokemon Card */}
      <section className="mt-10 flex justify-center px-2">
        {pokemon && <PokemonCard data={pokemon} />}
        {!pokemon && !loading && !error && (
          <p className="text-slate-200 text-sm md:text-base text-center">
            Try searching for <span className="font-semibold">“pikachu”</span>,{" "}
            <span className="font-semibold">“charizard”</span> or hit{" "}
            <span className="font-semibold">Random</span> to explore!
          </p>
        )}
      </section>
    </div>
  );
}
