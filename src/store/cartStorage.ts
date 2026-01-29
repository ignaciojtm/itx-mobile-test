const KEY = 'itx_cart_count_v1';

export function loadCartCount(): number {
  const raw = localStorage.getItem(KEY);
  if (!raw) return 0;
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

export function saveCartCount(count: number) {
  localStorage.setItem(KEY, String(count));
}
