import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { WHATSAPP_DISPLAY, buildWhatsAppLink, generateWhatsAppGeneralContact } from '../utils/whatsapp';
import { useStoreData } from '../context/StoreDataContext';

export const Collections: React.FC = () => {
  const { products } = useStoreData();
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#76518F] to-[#C65A86] text-white p-8 sm:p-14 shadow-xl">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Temporada Actual</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight">
            Lo nuevo de PURÉ FASHION
          </h1>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            Descubre los últimos ingresos en prendas de vestir: cortes vanguardistas, siluetas contemporáneas y paletas que inspiran.
          </p>

          <div className="pt-2">
            <a
              href={buildWhatsAppLink(generateWhatsAppGeneralContact())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#29232A] hover:bg-[#F8DCE8] font-bold rounded-xl text-xs transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Consultar novedades por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Grid of New Arrivals */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#29232A]">
            Prendas recién llegadas ({newArrivals.length})
          </h2>
          <span className="text-xs text-[#76518F] font-semibold">
            Stock limitado por modelo
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
};
