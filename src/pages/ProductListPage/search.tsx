import type { ProductListItem } from '../../domain/product/types';

export function matchesQuery(p: ProductListItem, q: string) {
  const query = q.trim().toLowerCase();
  if (!query) return true;

  return (
    p.brand.toLowerCase().includes(query) ||
    p.model.toLowerCase().includes(query)
  );
}
