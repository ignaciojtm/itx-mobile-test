import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../../services/api/apiClient';
import type { ProductListItem } from '../../domain/product/types';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import styles from './ProductListPage.module.css';
import { matchesQuery } from './search';

export function ProductListPage() {
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'error' | 'success'
  >('idle');
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

  const filtered = useMemo(() => {
    return items.filter((p) => matchesQuery(p, query));
  }, [items, query]);

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Productos</h1>

        <label className={styles.search}>
          <span className={styles.searchLabel}>Buscar</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Marca o modelo…"
            className={styles.input}
          />
        </label>
      </div>

      {status === 'loading' && (
        <p className={styles.state}>Cargando productos…</p>
      )}
      {status === 'error' && <p className={styles.state}>Error: {errorMsg}</p>}

      {status === 'success' && filtered.length === 0 && (
        <p className={styles.state}>No hay resultados para “{query}”.</p>
      )}

      {status === 'success' && filtered.length > 0 && (
        <div className={styles.grid} role="list">
          {filtered.map((p) => (
            <div key={p.id} role="listitem">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
