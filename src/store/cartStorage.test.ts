import { describe, test, expect, beforeEach } from 'vitest';
import { loadCartCount, saveCartCount } from './cartStorage';

beforeEach(() => {
  localStorage.clear();
});

describe('cartStorage', () => {
  test('returns 0 when nothing stored', () => {
    expect(loadCartCount()).toBe(0);
  });

  test('persists and loads count', () => {
    saveCartCount(5);
    expect(loadCartCount()).toBe(5);
  });

  test('returns 0 for invalid values', () => {
    localStorage.setItem('itx_cart_count_v1', 'nope');
    expect(loadCartCount()).toBe(0);
  });
});
