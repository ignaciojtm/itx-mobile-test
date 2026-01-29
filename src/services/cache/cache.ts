type CacheEntry<T> = {
  timestamp: number;
  data: T;
};

const PREFIX = 'itx-cache:';

function buildKey(key: string) {
  return `${PREFIX}${key}`;
}

export function setCache<T>(key: string, data: T) {
  const entry: CacheEntry<T> = {
    timestamp: Date.now(),
    data,
  };

  localStorage.setItem(buildKey(key), JSON.stringify(entry));
}

export function getCache<T>(key: string, ttlMs: number): T | null {
  const raw = localStorage.getItem(buildKey(key));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as CacheEntry<T>;

    const expired = Date.now() - parsed.timestamp > ttlMs;
    if (expired) return null;

    return parsed.data;
  } catch {
    return null;
  }
}

export function clearCache(key: string) {
  localStorage.removeItem(buildKey(key));
}
