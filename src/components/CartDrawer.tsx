import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { buildWhatsAppLink, generateWhatsAppOrderMessage, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems
  } = useCart();

  const [customerName, setCustomerName] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppOrderMessage(cart, subtotal, 'Por coordinar con tienda', customerName);
    const url = buildWhatsAppLink(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGoToCheckout = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9F5] shadow-2xl flex flex-col border-l border-[#F8DCE8]">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-white border-b border-[#F8DCE8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#F8DCE8] text-[#C65A86] rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#29232A]">Tu Carrito</h3>
                <p className="text-xs text-[#76518F]">
                  {totalItems} {totalItems === 1 ? 'prenda seleccionada' : 'prendas seleccionadas'}
                </p>
              </div>
            </div>

            <button
              onClick={closeCartDrawer}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-[#F8DCE8]/50 rounded-full transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#29232A]/70">
                <div className="w-16 h-16 rounded-full bg-[#F8DCE8] text-[#C65A86] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-base text-[#29232A] mb-1">Tu carrito está vacío</h4>
                <p className="text-xs text-[#29232A]/70 max-w-xs mb-6">
                  Descubre prendas modernas y añade tus favoritas para armar tu outfit ideal.
                </p>
                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/tienda');
                  }}
                  className="px-6 py-2.5 bg-[#C65A86] hover:bg-[#a9446d] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                >
                  Explorar la Tienda
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center text-xs text-[#29232A]/70 pb-2 border-b border-[#F8DCE8]/60">
                  <span>Prendas en tu orden</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-600 hover:underline flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Vaciar
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="bg-white rounded-2xl p-3 border border-[#F8DCE8] flex gap-3 shadow-xs"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-18 h-22 object-cover rounded-xl bg-[#FFF9F5] shrink-0"
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs font-bold text-[#29232A] line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="text-slate-400 hover:text-rose-600 p-0.5"
                              title="Eliminar prenda"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 text-[11px] text-[#76518F] mt-1">
                            <span>Talla: <strong>{item.selectedSize}</strong></span>
                            <span>•</span>
                            <span>Color: <strong>{item.selectedColor}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F8DCE8]/40">
                          <span className="font-extrabold text-xs text-[#29232A] font-mono tabular-nums">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>

                          {/* Stepper */}
                          <div className="flex items-center border border-[#F8DCE8] rounded-lg bg-[#FFF9F5] overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="px-2 py-0.5 hover:bg-[#F8DCE8] text-[#29232A] transition-colors"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className="px-2 py-0.5 hover:bg-[#F8DCE8] text-[#29232A] transition-colors disabled:opacity-30"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Optional Customer Name for WhatsApp message */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#F8DCE8] text-xs space-y-1.5">
                  <label htmlFor="customer-name-cart" className="font-semibold text-[#76518F] block">
                    Tu nombre para el mensaje de WhatsApp (opcional):
                  </label>
                  <input
                    id="customer-name-cart"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej. María Flores"
                    className="w-full px-3 py-1.5 bg-[#FFF9F5] border border-[#F8DCE8] rounded-lg text-xs text-[#29232A] focus:outline-hidden focus:border-[#C65A86]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer Totals & Actions */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-[#F8DCE8] space-y-3">
              <div className="space-y-1.5 text-xs text-[#29232A]">
                <div className="flex justify-between">
                  <span className="text-[#29232A]/70">Subtotal:</span>
                  <span className="font-bold font-mono tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#29232A]/70">Envío:</span>
                  <span className="text-emerald-700 font-semibold">Por coordinar / Recojo gratis</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#29232A] pt-2 border-t border-[#F8DCE8]">
                  <span>Total estimado:</span>
                  <span className="text-[#C65A86] font-mono tabular-nums">{formatPrice(subtotal)}</span>
                </div>
              </div>

              {/* Primary WhatsApp Action */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Comprar por WhatsApp ({formatPrice(subtotal)})</span>
              </button>

              {/* Demo Web Checkout */}
              <button
                onClick={handleGoToCheckout}
                className="w-full py-2.5 bg-[#76518F] hover:bg-[#603e77] text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Completar Checkout Web</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={closeCartDrawer}
                className="w-full text-center text-xs text-[#76518F] font-semibold hover:underline py-1"
              >
                Continuar comprando
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
