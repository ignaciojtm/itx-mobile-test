import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { ProductListPage } from '../../pages/ProductListPage/ProductListPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage/ProductDetailsPage';

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: '/', element: <ProductListPage /> },
        { path: '/product/:id', element: <ProductDetailsPage /> },
      ],
    },
  ]);
