export function parsePrice(price: string): number | null {
    const trimmed = price?.trim();
    if (!trimmed) return null;
  
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : null;
}
  
export function formatPriceEUR(price: string): string {
    const n = parsePrice(price);
    if (n === null) return '—';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(n);
}
  