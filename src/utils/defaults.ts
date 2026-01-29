import type { ProductOption } from '../domain/product/types';

export function defaultOption(
  options: ProductOption[] | undefined,
): ProductOption | null {
  if (!options || options.length === 0) return null;
  return options[0];
}
