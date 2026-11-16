import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useStoreData } from '../context/StoreDataContext';
import { ProductCard } from '../components/ProductCard';

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const { products } = useStoreData();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F8DCE8] text-[#C65A86] flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#29232A] font-display mb-2">
          No tienes prendas guardadas en Favoritos
        </h1>
        <p className="text-xs sm:text-sm text-[#29232A]/70 mb-8">
          Guarda tus prendas preferidas haciendo clic en el corazón de cualquier tarjeta de producto para revisarlas más tarde.
        </p>
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C65A86] hover:bg-[#a9446d] text-white font-bold rounded-2xl text-xs sm:text-sm transition-colors shadow-md"
        >
          <span>Explorar Prendas</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
          Tu Lista de Deseos
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#29232A] font-display mt-0.5">
          Mis Favoritos ({favoriteProducts.length})
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
