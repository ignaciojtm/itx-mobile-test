import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { ProductDetails, ProductOption } from '../../domain/product/types';
import { useProduct } from '../../hooks/useProduct';
import { useAddToCart } from '../../hooks/useAddToCart';
import { formatPriceEUR } from '../../utils/price';
import { defaultOption } from '../../utils/defaults';
import styles from './ProductDetailsPage.module.css';

function ProductDetailsContent({
  product,
  id,
  addToCart,
  isAdding,
  addedMsg,
}: {
  product: ProductDetails;
  id: string;
  addToCart: (payload: {
    id: string;
    colorCode: number;
    storageCode: number;
  }) => void;
  isAdding: boolean;
  addedMsg: string | null;
}) {
  const [selectedColor, setSelectedColor] = useState<ProductOption | null>(
    () => defaultOption(product.options?.colors),
  );
  const [selectedStorage, setSelectedStorage] = useState<ProductOption | null>(
    () => defaultOption(product.options?.storages),
  );

  const canAdd = Boolean(selectedColor && selectedStorage && !isAdding);

  const specs = useMemo(
    () =>
      [
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
      ] as const,
    [product],
  );

  function handleAdd() {
    if (!selectedColor || !selectedStorage) return;
    addToCart({
      id,
      colorCode: selectedColor.code,
      storageCode: selectedStorage.code,
    });
  }

  return (
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
                  product.options.colors.find((c) => c.code === code) ?? null;
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
                  product.options.storages.find((s) => s.code === code) ?? null;
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
  );
}

export function ProductDetailsPage() {
  const { id } = useParams();
  const { product, status, errorMsg } = useProduct(id);
  const { addToCart, isAdding, message: addedMsg } = useAddToCart();

  return (
    <section className={styles.page}>
      <Link to="/" className={styles.back}>
        ← Volver al listado
      </Link>

      {status === 'loading' && <p>Cargando producto…</p>}
      {status === 'error' && <p>Error: {errorMsg}</p>}

      {status === 'success' && product && id && (
        <ProductDetailsContent
          key={product.id}
          product={product}
          id={id}
          addToCart={addToCart}
          isAdding={isAdding}
          addedMsg={addedMsg}
        />
      )}

      {status === 'success' && !product && <p>No encontrado.</p>}
    </section>
  );
}
