export const API_BASE = 'https://itx-frontend-test.onrender.com';

export const endpoints = {
  products: () => `${API_BASE}/api/product`,
  productById: (id: string) => `${API_BASE}/api/product/${id}`,
  cart: () => `${API_BASE}/api/cart`,
};
