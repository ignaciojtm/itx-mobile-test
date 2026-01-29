import { loadCartCount, saveCartCount } from './cartStorage';

type Listener = () => void;

let count = 0;
let hydrated = false;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

export function hydrateCart() {
  if (hydrated) return;
  count = loadCartCount();
  hydrated = true;
  emit();
}

export function getCartCount(): number {
  return count;
}

export function setCartCount(next: number) {
  count = next;
  saveCartCount(next);
  emit();
}

export function subscribeCart(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
