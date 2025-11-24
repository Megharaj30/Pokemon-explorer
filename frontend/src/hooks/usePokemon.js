import { useState } from "react";
import axios from "axios";

export default function usePokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPokemon = async (nameOrId) => {
    try {
      setLoading(true);
      setError("");
      setPokemon(null);

      const response = await axios.get(`https://pokemon-explorer-gld2.onrender.com/api/pokemon/${nameOrId}`);

      // Backend returns { source, pokemon }
      setPokemon(response.data.pokemon);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        "Failed to fetch Pokémon. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomPokemon = () => {
    // PokeAPI supports numeric IDs as path parameter
    const maxId = 898; // up to Gen 8; safe range
    const randomId = Math.floor(Math.random() * maxId) + 1;
    fetchPokemon(String(randomId));
  };

  return {
    pokemon,
    loading,
    error,
    fetchPokemon,
    fetchRandomPokemon,
  };
}
