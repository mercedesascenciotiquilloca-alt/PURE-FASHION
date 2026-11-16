import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = 'No encontramos prendas que coincidan con los filtros seleccionados.'
}) => {
  if (products.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-white rounded-3xl border border-[#F8DCE8] max-w-xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-[#F8DCE8] text-[#C65A86] flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[#29232A] mb-1">Sin prendas encontradas</h3>
        <p className="text-sm text-[#29232A]/70 mb-6">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
