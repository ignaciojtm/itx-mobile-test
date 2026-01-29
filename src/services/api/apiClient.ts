import { getCache, setCache } from '../cache/cache';
import { endpoints } from './endpoints';
import type {
  ProductListItem,
  ProductDetails,
} from '../../domain/product/types';

const TTL = 60 * 60 * 1000;

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function getProducts(): Promise<ProductListItem[]> {
  const key = 'products';

  const cached = getCache<ProductListItem[]>(key, TTL);
  if (cached) return cached;

  const data = await fetchJson<ProductListItem[]>(endpoints.products());
  setCache(key, data);
  return data;
}

export async function getProductById(id: string): Promise<ProductDetails> {
  const key = `product-${id}`;

  const cached = getCache<ProductDetails>(key, TTL);
  if (cached) return cached;

  const data = await fetchJson<ProductDetails>(endpoints.productById(id));

  setCache(key, data);
  return data;
}

export type AddToCartPayload = {
  id: string;
  colorCode: number;
  storageCode: number;
};

export type AddToCartResponse = {
  count: number;
};

export async function addToCart(
  payload: AddToCartPayload,
): Promise<AddToCartResponse> {
  return fetchJson<AddToCartResponse>(endpoints.cart(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
