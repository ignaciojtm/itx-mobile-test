import { useEffect, useState } from 'react';
import { getProductById } from '../services/api/apiClient';
import type { ProductDetails } from '../domain/product/types';

type Status = 'idle' | 'loading' | 'error' | 'success';

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const productId = id;
    let cancelled = false;

    async function run() {
      setStatus('loading');
      setErrorMsg(null);

      try {
        const data = await getProductById(productId);
        if (cancelled) return;
        setProduct(data);
        setStatus('success');
      } catch (e) {
        if (cancelled) return;
        setStatus('error');
        setErrorMsg(e instanceof Error ? e.message : 'Unknown error');
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, status, errorMsg };
}
