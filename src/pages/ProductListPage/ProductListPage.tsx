import { useMemo, useState } from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import styles from './ProductListPage.module.css';
import { matchesQuery } from './search';

export function ProductListPage() {
  const { items, status, errorMsg } = useProducts();
  const [query, setQuery] = useState('');

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
