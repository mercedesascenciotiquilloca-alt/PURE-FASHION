/**
 * Utility to format numbers as Peruvian Soles (S/)
 */
export function formatPrice(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

export function calculateDiscount(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
