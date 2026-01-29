import { Link, useLocation, matchPath } from 'react-router-dom';
import styles from './Header.module.css';

function getBreadcrumbs(pathname: string) {
  const crumbs: Array<{ label: string; to?: string }> = [
    { label: 'PLP', to: '/' },
  ];

  const isPdp = matchPath('/product/:id', pathname);
  if (isPdp) crumbs.push({ label: 'PDP' });

  if (pathname === '/') return [{ label: 'PLP' }];

  return crumbs;
}

export function Header() {
  const { pathname } = useLocation();
  const crumbs = getBreadcrumbs(pathname);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="Go to home">
          <span className={styles.logo} aria-hidden="true" />
          <span className={styles.title}>ITX Store</span>
        </Link>

        <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
          {crumbs.map((c, idx) => (
            <span key={`${c.label}-${idx}`} className={styles.crumb}>
              {idx > 0 ? <span className={styles.sep}>›</span> : null}
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>

        <div className={styles.cart} aria-label="Cart items count">
          🛒 <span className={styles.count}>0</span>
        </div>
      </div>
    </header>
  );
}
