import fetchApi from "./strapi";

// Create a simple cache object
const cache = new Map<string, { timestamp: number; data: any }>();

type FetchArgs = Parameters<typeof fetchApi>[0];

export default async function cachedFetchApi<T>(args: FetchArgs): Promise<T> {
  const { endpoint, query, wrappedByKey, wrappedByList } = args;

  // Generate cache key
  const key = `${endpoint}?${new URLSearchParams(query || {}).toString()}|${wrappedByKey || ""}|${wrappedByList || ""}`;

  const cacheEntry = cache.get(key);

  // Optional: cache expiry in ms (e.g., 15 days)
  const maxAge = 15 * 24 * 60 * 60 * 1000; 

  if (cacheEntry && Date.now() - cacheEntry.timestamp < maxAge) {
    return cacheEntry.data;
  }

  const data = await fetchApi<T>({ endpoint, query, wrappedByKey, wrappedByList });

  cache.set(key, { timestamp: Date.now(), data });

  return data;
}
