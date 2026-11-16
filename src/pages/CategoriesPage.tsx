import React from 'react';
import { CategoryCard } from '../components/CategoryCard';
import { useStoreData } from '../context/StoreDataContext';

export const CategoriesPage: React.FC = () => {
  const { categories } = useStoreData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
          Explora por Tipo de Prenda
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#29232A] font-display mt-0.5">
          Todas las Categorías de Ropa
        </h1>
        <p className="text-xs sm:text-sm text-[#29232A]/70 mt-1 max-w-2xl">
          Descubre nuestra selección especializada de moda femenina y urbana dividida por prendas para que encuentres exactamente lo que necesitas.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
