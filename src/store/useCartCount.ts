import { useEffect, useSyncExternalStore } from 'react';
import { getCartCount, hydrateCart, subscribeCart } from './cartStore';

export function useCartCount() {
  useEffect(() => {
    hydrateCart();
  }, []);

  return useSyncExternalStore(subscribeCart, getCartCount, () => 0);
}
