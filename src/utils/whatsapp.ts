import { CartItem, Product } from '../types';
import { formatPrice } from './formatPrice';

export const WHATSAPP_PHONE = '51949173777';
export const WHATSAPP_DISPLAY = '+51 949 173 777';
export const STORE_OWNER = 'Mercedes Ascencio Tiquilloca';
export const STORE_CITY = 'Puno / Juliaca, Perú';

/**
 * Builds direct WhatsApp URL with URL-encoded message
 */
export function buildWhatsAppLink(text: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text.trim())}`;
}

/**
 * Creates dynamic order message according to prompt guidelines
 */
export function generateWhatsAppOrderMessage(
  items: CartItem[],
  subtotal: number,
  shippingEstimate: string = 'Por confirmar',
  customerName?: string
): string {
  const itemsText = items
    .map(
      (item) =>
        `- ${item.product.name}\n  • Talla: ${item.selectedSize}\n  • Color: ${item.selectedColor}\n  • Cantidad: ${item.quantity}\n  • Precio unitario: ${formatPrice(item.product.price)}`
    )
    .join('\n\n');

  const total = formatPrice(subtotal);

  let message = `Hola, quiero realizar un pedido en PURÉ FASHION.\n\nProductos:\n\n${itemsText}\n\n`;
  message += `Subtotal: ${formatPrice(subtotal)}\n`;
  message += `Envío: ${shippingEstimate}\n`;
  message += `Total estimado: ${total}\n\n`;

  if (customerName && customerName.trim()) {
    message += `Nombre del cliente: ${customerName.trim()}\n\n`;
  }

  message += `¿Podrían confirmarme la disponibilidad y los detalles de entrega?`;

  return message;
}

/**
 * Creates inquiry message for a single product
 */
export function generateWhatsAppProductInquiry(
  product: Product,
  selectedSize?: string,
  selectedColor?: string
): string {
  let message = `Hola PURÉ FASHION, me gustaría consultar la disponibilidad de la siguiente prenda:\n\n`;
  message += `Prenda: ${product.name}\n`;
  message += `Categoría: ${product.category}\n`;
  message += `Precio: ${formatPrice(product.price)}\n`;
  if (selectedSize) message += `Talla de interés: ${selectedSize}\n`;
  if (selectedColor) message += `Color de interés: ${selectedColor}\n`;
  message += `\n¿Tienen stock disponible y cómo coordinamos la entrega? ¡Muchas gracias!`;
  return message;
}

/**
 * General contact inquiry message
 */
export function generateWhatsAppGeneralContact(): string {
  return `Hola PURÉ FASHION, deseo comunicarme para realizar una consulta sobre sus prendas y envíos en Puno.`;
}
