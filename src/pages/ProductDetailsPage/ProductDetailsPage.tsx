import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addToCart, getProductById } from '../../services/api/apiClient';
import type { ProductDetails, ProductOption } from '../../domain/product/types';
import { formatPriceEUR } from '../../utils/price';
import { defaultOption } from '../../utils/defaults';
import styles from './ProductDetailsPage.module.css';

type Status = 'idle' | 'loading' | 'error' | 'success';

export function ProductDetailsPage() {
  const { id } = useParams();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductDetails | null>(null);

  const [selectedColor, setSelectedColor] = useState<ProductOption | null>(
    null,
  );
  const [selectedStorage, setSelectedStorage] = useState<ProductOption | null>(
    null,
  );

  const [isAdding, setIsAdding] = useState(false);
  const [addedMsg, setAddedMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const productId = id;

    let cancelled = false;

    async function run() {
      setStatus('loading');
      setErrorMsg(null);
      setAddedMsg(null);

      try {
        const data = await getProductById(productId);
        if (cancelled) return;

        setProduct(data);

        setSelectedColor(defaultOption(data.options?.colors));
        setSelectedStorage(defaultOption(data.options?.storages));

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

  const canAdd = Boolean(id && selectedColor && selectedStorage && !isAdding);

  const specs = useMemo(() => {
    if (!product) return [];

    return [
      ['CPU', product.cpu],
      ['RAM', product.ram],
      ['OS', product.os],
      ['Resolución', product.displayResolution],
      ['Batería', product.battery],
      [
        'Cámara principal',
        Array.isArray(product.primaryCamera)
          ? product.primaryCamera.join(', ')
          : String(product.primaryCamera),
      ],
      [
        'Cámara secundaria',
        Array.isArray(product.secondaryCmera)
          ? product.secondaryCmera.join(', ')
          : String(product.secondaryCmera),
      ],
      ['Dimensiones', product.dimentions],
      ['Peso', product.weight],
    ] as const;
  }, [product]);

  async function handleAdd() {
    if (!id || !selectedColor || !selectedStorage) return;

    setIsAdding(true);
    setAddedMsg(null);

    try {
      const res = await addToCart({
        id,
        colorCode: selectedColor.code,
        storageCode: selectedStorage.code,
      });

      setAddedMsg(`Añadido al carrito. Total: ${res.count}`);
    } catch (e) {
      setAddedMsg(
        e instanceof Error
          ? `Error: ${e.message}`
          : 'Error al añadir al carrito',
      );
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <section className={styles.page}>
      <Link to="/" className={styles.back}>
        ← Volver al listado
      </Link>

      {status === 'loading' && <p>Cargando producto…</p>}
      {status === 'error' && <p>Error: {errorMsg}</p>}

      {status === 'success' && product && (
        <div className={styles.content}>
          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src={product.imgUrl}
              alt={`${product.brand} ${product.model}`}
            />
          </div>

          <div className={styles.panel}>
            <div>
              <h1 className={styles.title}>
                {product.brand} {product.model}
              </h1>
              <div className={styles.meta}>ID: {product.id}</div>
            </div>

            <div className={styles.price}>{formatPriceEUR(product.price)}</div>

            <div className={styles.controls}>
              <div className={styles.field}>
                <div className={styles.label}>Color</div>
                <select
                  className={styles.select}
                  value={selectedColor?.code ?? ''}
                  onChange={(e) => {
                    const code = Number(e.target.value);
                    const opt =
                      product.options.colors.find((c) => c.code === code) ??
                      null;
                    setSelectedColor(opt);
                  }}
                >
                  {product.options.colors.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <div className={styles.label}>Almacenamiento</div>
                <select
                  className={styles.select}
                  value={selectedStorage?.code ?? ''}
                  onChange={(e) => {
                    const code = Number(e.target.value);
                    const opt =
                      product.options.storages.find((s) => s.code === code) ??
                      null;
                    setSelectedStorage(opt);
                  }}
                >
                  {product.options.storages.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className={styles.button}
                onClick={handleAdd}
                disabled={!canAdd}
              >
                {isAdding ? 'Añadiendo…' : 'Añadir'}
              </button>

              {addedMsg ? <div className={styles.meta}>{addedMsg}</div> : null}
            </div>

            <div className={styles.specs}>
              <div className={styles.meta}>Especificaciones</div>
              <div className={styles.specGrid}>
                {specs.map(([k, v]) => (
                  <div key={k} className={styles.specItem}>
                    <div className={styles.specKey}>{k}</div>
                    <div className={styles.specVal}>{v || '—'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {status === 'success' && !product && <p>No encontrado.</p>}
    </section>
  );
}
