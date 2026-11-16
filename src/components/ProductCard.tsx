import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, calculateDiscount } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Original');
  const [imgError, setImgError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const discount = calculateDiscount(product.price, product.oldPrice);
  const isFav = isFavorite(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const success = addToCart(product, selectedSize, selectedColor, 1);
    if (success) {
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1200);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#F8DCE8] overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
      
      {/* Product Image Area */}
      <Link
        to={`/producto/${product.slug}`}
        className="block relative aspect-4/5 w-full bg-[#FFF9F5] overflow-hidden"
      >
        {!imgError ? (
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F8DCE8]/60 to-[#FFF9F5] p-4 text-center">
            <span className="text-3xl mb-2">👗</span>
            <p className="text-xs font-semibold text-[#76518F]">{product.name}</p>
            <p className="text-[10px] text-[#29232A]/60 mt-1">{product.category}</p>
          </div>
        )}

        {/* Badges / Discount */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {discount && (
            <span className="px-2 py-0.5 bg-[#C65A86] text-white text-[10px] font-bold rounded-md shadow-xs">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 bg-[#76518F] text-white text-[10px] font-semibold rounded-md shadow-xs">
              Nuevo
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-colors z-10 shadow-xs ${
            isFav
              ? 'bg-[#C65A86] text-white'
              : 'bg-white/90 text-[#29232A] hover:text-[#C65A86] hover:bg-white'
          }`}
          aria-label={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          title="Guardar en favoritos"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        {/* Stock Alert if low */}
        {product.stock <= 5 && (
          <div className="absolute bottom-2 left-2 bg-amber-500/90 text-white text-[10px] font-medium px-2 py-0.5 rounded-sm backdrop-blur-xs">
            ¡Solo quedan {product.stock}!
          </div>
        )}
      </Link>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#76518F] mb-1">
            <span className="font-semibold uppercase tracking-wider">{product.category}</span>
            <div className="flex items-center gap-1 text-[#29232A]/70">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-[10px] text-slate-400">({product.reviews})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link
            to={`/producto/${product.slug}`}
            className="block text-sm font-bold text-[#29232A] hover:text-[#C65A86] transition-colors line-clamp-1 mb-1.5"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Price baseline */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-extrabold text-[#29232A] font-mono tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Size Quick Selector */}
          <div className="mb-3.5">
            <div className="flex items-center justify-between text-[10px] text-[#29232A]/70 mb-1">
              <span>Talla: <strong className="text-[#29232A]">{selectedSize}</strong></span>
              <span className="text-emerald-700 font-medium">Disponible</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(size);
                  }}
                  className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-colors ${
                    selectedSize === size
                      ? 'bg-[#76518F] text-white shadow-xs'
                      : 'bg-[#FFF9F5] text-[#29232A] border border-[#F8DCE8] hover:border-[#C65A86]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Row */}
        <div className="pt-2 border-t border-[#F8DCE8]/60 flex items-center gap-2">
          <button
            onClick={handleQuickAdd}
            disabled={product.stock <= 0}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[#C65A86] hover:bg-[#a9446d] text-white shadow-xs'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>¡Agregado!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Agregar</span>
              </>
            )}
          </button>

          <Link
            to={`/producto/${product.slug}`}
            className="py-2 px-2.5 text-xs text-[#76518F] hover:bg-[#F8DCE8]/50 font-semibold rounded-xl border border-[#F8DCE8] transition-colors whitespace-nowrap"
          >
            Detalles
          </Link>
        </div>

      </div>
    </div>
  );
};
