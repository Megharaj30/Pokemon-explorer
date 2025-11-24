// src/cache.js

/**
 * Simple in-memory LRU cache with TTL.
 * - Uses Map to preserve insertion order.
 * - On get: checks TTL, moves key to end (most recently used).
 * - On set: if size exceeds max, evicts least recently used (first entry).
 */
export class LRUCache {
  constructor(maxSize, ttlMs) {
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
    this.map = new Map(); // key -> { value, expiresAt }
  }

  _isExpired(entry) {
    return Date.now() > entry.expiresAt;
  }

  get(key) {
    const entry = this.map.get(key);
    if (!entry) return null;

    if (this._isExpired(entry)) {
      // Expired → delete and return null
      this.map.delete(key);
      return null;
    }

    // Refresh LRU order: delete and re-set to move to end
    this.map.delete(key);
    this.map.set(key, entry);

    return entry.value;
  }

  set(key, value) {
    const expiresAt = Date.now() + this.ttlMs;

    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.maxSize) {
      // Evict least recently used (first item in Map)
      const lruKey = this.map.keys().next().value;
      this.map.delete(lruKey);
    }

    this.map.set(key, { value, expiresAt });
  }

  clear() {
    this.map.clear();
  }
}
