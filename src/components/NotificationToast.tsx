import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NotificationToast: React.FC = () => {
  const { toastMessage, hideToast, openCartDrawer } = useCart();

  if (!toastMessage || !toastMessage.show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white rounded-2xl shadow-xl border border-[#F8DCE8] p-4 flex items-center gap-3 animate-slideUp transition-all">
      <div className="w-10 h-10 rounded-xl bg-[#F8DCE8] text-[#C65A86] flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-6 h-6" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[#C65A86]">Carrito de compras</p>
        <p className="text-sm font-medium text-[#29232A] truncate">{toastMessage.text}</p>
        <button
          onClick={() => {
            hideToast();
            openCartDrawer();
          }}
          className="text-xs text-[#76518F] font-semibold hover:underline mt-0.5 inline-block"
        >
          Ver carrito →
        </button>
      </div>

      <button
        onClick={hideToast}
        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
