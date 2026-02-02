import { describe, test, expect, beforeEach, vi } from 'vitest';

beforeEach(() => {
  localStorage.clear();
  vi.resetModules();
});

describe('cartStore', () => {
  test('default count is 0', async () => {
    const { getCartCount } = await import('./cartStore');
    expect(getCartCount()).toBe(0);
  });

  test('setCartCount updates value and persists', async () => {
    const { getCartCount, setCartCount } = await import('./cartStore');
    setCartCount(7);
    expect(getCartCount()).toBe(7);
    expect(localStorage.getItem('itx_cart_count_v1')).toBe('7');
  });

  test('hydrateCart loads persisted count once', async () => {
    localStorage.setItem('itx_cart_count_v1', '3');
    const { getCartCount, hydrateCart } = await import('./cartStore');

    hydrateCart();
    expect(getCartCount()).toBe(3);

    localStorage.setItem('itx_cart_count_v1', '9');
    hydrateCart();
    expect(getCartCount()).toBe(3);
  });
});
