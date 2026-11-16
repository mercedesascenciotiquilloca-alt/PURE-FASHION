import React from 'react';
import { Tag, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useStoreData } from '../context/StoreDataContext';

export const Offers: React.FC = () => {
  const { products } = useStoreData();
  const discountedProducts = products.filter(
    (p) => p.oldPrice && p.oldPrice > p.price
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#C65A86] via-[#a9446d] to-[#76518F] text-white rounded-3xl p-8 sm:p-14 shadow-xl">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Tag className="w-3.5 h-3.5" />
            <span>Precios Especiales</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
            Tu próximo look te espera
          </h1>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Aprovecha nuestros descuentos exclusivos en prendas seleccionadas. Descuentos transparentes y stock por tiempo limitado.
          </p>
        </div>
      </div>

      {/* Grid of Sale Items */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#29232A]">
            Prendas en Promoción ({discountedProducts.length})
          </h2>
          <span className="text-xs text-[#C65A86] font-bold">
            Hasta 25% OFF
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {discountedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
};
