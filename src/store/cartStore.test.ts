import { describe, test, expect, beforeEach } from 'vitest';
import {
  __resetCartStoreForTests,
  getCartCount,
  hydrateCart,
  setCartCount,
} from './cartStore';

beforeEach(() => {
  localStorage.clear();
  __resetCartStoreForTests();
});

describe('cartStore', () => {
  test('default count is 0', () => {
    expect(getCartCount()).toBe(0);
  });

  test('setCartCount updates value and persists', () => {
    setCartCount(7);
    expect(getCartCount()).toBe(7);
    expect(localStorage.getItem('itx_cart_count_v1')).toBe('7');
  });

  test('hydrateCart loads persisted count once', () => {
    localStorage.setItem('itx_cart_count_v1', '3');

    hydrateCart();
    expect(getCartCount()).toBe(3);

    localStorage.setItem('itx_cart_count_v1', '9');
    hydrateCart();
    expect(getCartCount()).toBe(3);
  });
});
