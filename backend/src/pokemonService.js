// src/pokemonService.js
import axios from "axios";
import { LRUCache } from "./cache.js";
import { CACHE_MAX_ENTRIES, CACHE_TTL_MS, POKEAPI_BASE_URL } from "./config.js";

const cache = new LRUCache(CACHE_MAX_ENTRIES, CACHE_TTL_MS);

/**
 * Normalize user input for PokeAPI (case-insensitive).
 */
function normalizeName(name) {
  return String(name).trim().toLowerCase();
}

/**
 * Shape the PokeAPI response into a cleaner structure for UI.
 * (You can add/remove fields as you like.)
 */
function transformPokemonResponse(data) {
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    base_experience: data.base_experience,
    sprites: {
      front_default: data.sprites.front_default,
      other: data.sprites.other
    },
    types: data.types.map((t) => t.type.name),
    abilities: data.abilities.map((a) => ({
      name: a.ability.name,
      is_hidden: a.is_hidden,
      slot: a.slot
    })),
    stats: data.stats.map((s) => ({
      name: s.stat.name,
      base_stat: s.base_stat
    })),
    moves: data.moves
      .slice(0, 10)
      .map((m) => m.move.name) // limit to 10 moves to keep payload small
  };
}

/**
 * Main function used by routes to get Pokemon data.
 * Handles:
 * - cache hit/miss
 * - PokeAPI call
 * - mapping errors
 */
export async function getPokemonByName(name) {
  const key = normalizeName(name);

  // 1. Try cache
  const cached = cache.get(key);
  if (cached) {
    return {
      source: "cache",
      pokemon: cached
    };
  }

  // 2. Fetch from PokeAPI
  try {
    const url = `${POKEAPI_BASE_URL}/pokemon/${encodeURIComponent(key)}`;
    const response = await axios.get(url, { timeout: 8000 });

    const transformed = transformPokemonResponse(response.data);

    // 3. Store in cache
    cache.set(key, transformed);

    return {
      source: "live",
      pokemon: transformed
    };
  } catch (err) {
    if (err.response && err.response.status === 404) {
      const notFoundError = new Error(`Pokemon '${name}' not found`);
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    const apiError = new Error("Error while calling PokeAPI");
    apiError.statusCode = 502;
    throw apiError;
  }
}
