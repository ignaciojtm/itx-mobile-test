import { beforeEach, describe, expect, test, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../../services/api/apiClient', async () => {
  return {
    getProductById: vi.fn(async () => ({
      id: 'ZmGrkLRPXOTpxsU4jjAcv',
      brand: 'Acer',
      model: 'Iconia Talk S',
      price: '170',
      imgUrl: 'https://example.com/p.jpg',

      networkTechnology: '',
      networkSpeed: '',
      gprs: '',
      edge: '',
      announced: '',
      status: '',
      dimentions: '',
      weight: '260',
      sim: '',
      displayType: '',
      displayResolution: '720 x 1280',
      displaySize: '',
      os: 'Android',
      cpu: 'Quad-core',
      chipset: '',
      gpu: '',
      externalMemory: '',
      internalMemory: ['16 GB', '32 GB'],
      ram: '2 GB',
      primaryCamera: ['13 MP'],
      secondaryCmera: ['2 MP'],
      speaker: '',
      audioJack: '',
      wlan: [],
      bluetooth: [],
      gps: '',
      nfc: '',
      radio: '',
      usb: '',
      sensors: [],
      battery: '3400 mAh',
      colors: ['Black'],
      options: {
        colors: [{ code: 1000, name: 'Black' }],
        storages: [
          { code: 2000, name: '16 GB' },
          { code: 2001, name: '32 GB' },
        ],
      },
    })),
    addToCart: vi.fn(async () => ({ count: 42 })),
    getProducts: vi.fn(async () => []),
  };
});

beforeEach(() => {
  localStorage.clear();
  vi.resetModules();
});

describe('PDP add to cart', () => {
  test('updates header cart count after adding', async () => {
    const { AppLayout } = await import('../../app/layout/AppLayout');
    const { ProductDetailsPage } = await import('./ProductDetailsPage');

    render(
      <MemoryRouter initialEntries={['/product/ZmGrkLRPXOTpxsU4jjAcv']}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/product/:id" element={<ProductDetailsPage />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByLabelText('Cart items count')).toHaveTextContent('0');

    await screen.findByRole('heading', { name: /acer iconia talk s/i });

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /añadir/i }));

    expect(screen.getByLabelText('Cart items count')).toHaveTextContent('42');
  });
});
