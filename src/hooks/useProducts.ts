import { useEffect, useState } from 'react';
import { getProducts } from '../services/api/apiClient';
import type { ProductListItem } from '../domain/product/types';

type Status = 'idle' | 'loading' | 'error' | 'success';

export function useProducts() {
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setStatus('loading');
      setErrorMsg(null);

      try {
        const data = await getProducts();
        if (cancelled) return;
        setItems(data);
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
  }, []);

  return { items, status, errorMsg };
}
