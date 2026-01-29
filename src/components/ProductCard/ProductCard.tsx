import { Link } from 'react-router-dom';
import type { ProductListItem } from '../../domain/product/types';
import { formatPriceEUR } from '../../utils/price';
import styles from './ProductCard.module.css';

type Props = {
  product: ProductListItem;
};

export function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/product/${product.id}`}
      className={styles.card}
      aria-label={`${product.brand} ${product.model}`}
    >
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={product.imgUrl}
          alt={`${product.brand} ${product.model}`}
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.brand}>{product.brand}</div>
        <div className={styles.model}>{product.model}</div>
        <div className={styles.price}>{formatPriceEUR(product.price)}</div>
      </div>
    </Link>
  );
}
