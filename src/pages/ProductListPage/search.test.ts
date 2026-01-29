import { describe, test, expect } from 'vitest';
import { matchesQuery } from './search';
import type { ProductListItem } from '../../domain/product/types';

const p: ProductListItem = {
  id: '1',
  brand: 'Acer',
  model: 'Iconia Talk S',
  price: '170',
  imgUrl: 'x',
};

describe('matchesQuery', () => {
  test('matches empty query', () => {
    expect(matchesQuery(p, '')).toBe(true);
    expect(matchesQuery(p, '   ')).toBe(true);
  });

  test('matches brand', () => {
    expect(matchesQuery(p, 'ace')).toBe(true);
    expect(matchesQuery(p, 'ACER')).toBe(true);
  });

  test('matches model', () => {
    expect(matchesQuery(p, 'iconia')).toBe(true);
    expect(matchesQuery(p, 'talk')).toBe(true);
  });

  test('does not match random', () => {
    expect(matchesQuery(p, 'samsung')).toBe(false);
  });
});
