import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import styles from './AppLayout.module.css';

export function AppLayout() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
