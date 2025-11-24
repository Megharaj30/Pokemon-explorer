// src/config.js
export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
export const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
export const CACHE_MAX_ENTRIES = 100;       // LRU max size
export const PORT = process.env.PORT || 4000;
