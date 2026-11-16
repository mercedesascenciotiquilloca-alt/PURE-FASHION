import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/tienda?categoria=${encodeURIComponent(category.name)}`}
      className="group relative bg-white rounded-3xl overflow-hidden border border-[#F8DCE8] flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Category Image Area */}
      <div className="relative aspect-4/3 w-full bg-[#FFF9F5] overflow-hidden">
        {!imgError ? (
          <img
            src={category.image}
            alt={category.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F8DCE8] to-[#FFF9F5] p-6 text-center">
            <span className="text-4xl mb-2">✨</span>
            <p className="font-bold text-[#76518F]">{category.name}</p>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#F8DCE8]">
            {category.count} prendas disponibles
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-display drop-shadow-xs">
            {category.name}
          </h3>
        </div>
      </div>

      {/* Description & Button */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <p className="text-xs text-[#29232A]/70 line-clamp-2 mb-3">
          {category.description}
        </p>

        <div className="flex items-center justify-between text-xs font-bold text-[#C65A86] group-hover:text-[#76518F] transition-colors pt-1">
          <span>Ver prendas</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};
