import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { buildWhatsAppLink, generateWhatsAppOrderMessage, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [shippingOption, setShippingOption] = useState<'coordinar' | 'tienda'>('coordinar');

  const shippingText = shippingOption === 'tienda' ? 'Recojo en tienda (Gratis)' : 'Envío por coordinar';

  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppOrderMessage(cart, subtotal, shippingText, customerName);
    const url = buildWhatsAppLink(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F8DCE8] text-[#C65A86] flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#29232A] font-display mb-2">
          Tu carrito de compras está vacío
        </h1>
        <p className="text-sm text-[#29232A]/70 max-w-md mx-auto mb-8">
          Aún no has agregado prendas a tu bolsa. Explora nuestra nueva colección y encuentra prendas para cada ocasión.
        </p>
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C65A86] hover:bg-[#a9446d] text-white font-bold rounded-2xl text-sm transition-colors shadow-md"
        >
          <span>Ir a la tienda</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
            Bolsa de Compras
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#29232A] font-display mt-0.5">
            Mi Carrito ({totalItems} {totalItems === 1 ? 'prenda' : 'prendas'})
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:underline flex items-center gap-1.5 font-semibold"
        >
          <Trash2 className="w-4 h-4" />
          <span>Vaciar carrito</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Items Table/Cards (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-[#F8DCE8] overflow-hidden shadow-xs divide-y divide-[#F8DCE8]/60">
            {cart.map((item) => (
              <div key={item.cartItemId} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover rounded-2xl bg-[#FFF9F5] shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#76518F]">
                      {item.product.category}
                    </span>
                    <Link
                      to={`/producto/${item.product.slug}`}
                      className="text-sm font-bold text-[#29232A] hover:text-[#C65A86] block line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-[#29232A]/70 mt-1">
                      <span>Talla: <strong>{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>Color: <strong>{item.selectedColor}</strong></span>
                    </div>
                    <p className="text-xs font-mono font-semibold text-[#29232A] mt-1 sm:hidden">
                      {formatPrice(item.product.price)} c/u
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-[#F8DCE8]/40">
                  
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#F8DCE8] rounded-xl bg-[#FFF9F5]">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="px-3 py-1.5 text-xs hover:bg-[#F8DCE8] transition-colors"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold font-mono">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="px-3 py-1.5 text-xs hover:bg-[#F8DCE8] transition-colors disabled:opacity-30"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal Item */}
                  <div className="text-right min-w-20">
                    <span className="text-sm font-bold text-[#29232A] font-mono tabular-nums block">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">
                      ({formatPrice(item.product.price)} c/u)
                    </span>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Eliminar del carrito"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>

              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/tienda"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#76518F] hover:text-[#C65A86] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continuar comprando prendas</span>
            </Link>
          </div>
        </div>

        {/* Order Summary & WhatsApp Checkout (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#F8DCE8] p-6 space-y-6 shadow-xs sticky top-24">
          <h2 className="text-base font-extrabold text-[#29232A] border-b border-[#F8DCE8] pb-3">
            Resumen del Pedido
          </h2>

          {/* Delivery Option Selector */}
          <div>
            <label className="block text-xs font-bold text-[#76518F] uppercase tracking-wider mb-2">
              Método de entrega
            </label>
            <div className="space-y-2 text-xs">
              <label
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                  shippingOption === 'coordinar'
                    ? 'border-[#C65A86] bg-[#F8DCE8]/30 font-medium'
                    : 'border-[#F8DCE8] bg-[#FFF9F5]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingOption === 'coordinar'}
                    onChange={() => setShippingOption('coordinar')}
                    className="text-[#C65A86]"
                  />
                  <span>Envío a domicilio (Puno / Nacional)</span>
                </div>
                <span className="text-slate-500 font-mono">Por coordinar</span>
              </label>

              <label
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                  shippingOption === 'tienda'
                    ? 'border-[#C65A86] bg-[#F8DCE8]/30 font-medium'
                    : 'border-[#F8DCE8] bg-[#FFF9F5]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingOption === 'tienda'}
                    onChange={() => setShippingOption('tienda')}
                    className="text-[#C65A86]"
                  />
                  <span>Recojo en tienda (Juliaca / Puno)</span>
                </div>
                <span className="text-emerald-700 font-bold font-mono">Gratis</span>
              </label>
            </div>
          </div>

          {/* Customer Name input for WhatsApp text */}
          <div>
            <label htmlFor="customer-name-order" className="block text-xs font-bold text-[#76518F] uppercase tracking-wider mb-1.5">
              Tu nombre para el pedido (opcional)
            </label>
            <input
              id="customer-name-order"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ingresa tu nombre..."
              className="w-full px-3.5 py-2 text-xs bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl text-[#29232A] focus:outline-hidden focus:border-[#C65A86]"
            />
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-[#29232A] border-t border-[#F8DCE8] pt-4">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal prendas:</span>
              <span className="font-bold font-mono tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Costo de entrega:</span>
              <span className="text-slate-600 font-medium">{shippingText}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[#29232A] pt-3 border-t border-[#F8DCE8]">
              <span>Total Estimado:</span>
              <span className="text-[#C65A86] font-mono tabular-nums">{formatPrice(subtotal)}</span>
            </div>
          </div>

          {/* Checkout CTAs */}
          <div className="space-y-2.5">
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Comprar por WhatsApp ({formatPrice(subtotal)})</span>
            </button>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3 px-4 bg-[#76518F] hover:bg-[#603e77] text-white font-bold rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <span>Completar Checkout Web</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            Número oficial: <strong>{WHATSAPP_DISPLAY}</strong><br />
            Tu pedido se prepara con la debida confirmación de stock.
          </p>

        </div>

      </div>
    </div>
  );
};
