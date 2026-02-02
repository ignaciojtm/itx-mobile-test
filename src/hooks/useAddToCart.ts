import { useState } from 'react';
import { addToCart } from '../services/api/apiClient';
import { setCartCount } from '../store/cartStore';
import type { AddToCartPayload } from '../services/api/apiClient';

export function useAddToCart() {
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function doAddToCart(payload: AddToCartPayload) {
    setIsAdding(true);
    setMessage(null);

    try {
      const res = await addToCart(payload);
      setCartCount(res.count);
      setMessage(`Añadido al carrito. Total: ${res.count}`);
    } catch (e) {
      setMessage(
        e instanceof Error
          ? `Error: ${e.message}`
          : 'Error al añadir al carrito',
      );
    } finally {
      setIsAdding(false);
    }
  }

  return { addToCart: doAddToCart, isAdding, message };
}
