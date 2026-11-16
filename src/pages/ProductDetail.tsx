import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  ShieldCheck,
  Truck,
  MessageCircle,
  Ruler,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { formatPrice, calculateDiscount } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { SizeGuideModal } from '../components/SizeGuideModal';
import { ProductCard } from '../components/ProductCard';
import { useStoreData } from '../context/StoreDataContext';
import {
  buildWhatsAppLink,
  generateWhatsAppProductInquiry,
  WHATSAPP_DISPLAY
} from '../utils/whatsapp';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products } = useStoreData();

  const { addToCart, openCartDrawer } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const product = products.find((p) => p.slug === slug);

  // States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [validationError, setValidationError] = useState<string>('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Reset states when slug changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || '');
      setQuantity(1);
      setSelectedImageIndex(0);
      setValidationError('');
      window.scrollTo(0, 0);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#29232A] mb-2">Prenda no encontrada</h2>
        <p className="text-sm text-[#29232A]/70 mb-6">
          La prenda que buscas no existe o ha sido retirada del catálogo.
        </p>
        <Link
          to="/tienda"
          className="px-6 py-3 bg-[#C65A86] text-white font-semibold rounded-xl text-sm"
        >
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(product.id);
  const discount = calculateDiscount(product.price, product.oldPrice);

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = (openDrawer = false) => {
    if (!selectedSize) {
      setValidationError('Por favor selecciona una talla.');
      return;
    }
    if (!selectedColor) {
      setValidationError('Por favor selecciona un color.');
      return;
    }
    setValidationError('');

    const success = addToCart(product, selectedSize, selectedColor, quantity);
    if (success && openDrawer) {
      openCartDrawer();
    }
  };

  const handleWhatsAppConsult = () => {
    const message = generateWhatsAppProductInquiry(product, selectedSize, selectedColor);
    const url = buildWhatsAppLink(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} | PURÉ FASHION`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#76518F] hover:text-[#C65A86] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al catálogo</span>
        </button>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-white border border-[#F8DCE8] shadow-md">
            {!imgError ? (
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F8DCE8] to-[#FFF9F5] p-6 text-center">
                <span className="text-5xl mb-3">👗</span>
                <p className="text-sm font-bold text-[#76518F]">{product.name}</p>
                <p className="text-xs text-[#29232A]/70 mt-1">{product.category}</p>
              </div>
            )}

            {discount && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#C65A86] text-white text-xs font-bold rounded-lg shadow-sm">
                -{discount}% DESCUENTO
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#C65A86] ring-2 ring-[#F8DCE8]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} vista ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-[#76518F] font-semibold uppercase tracking-wider mb-2">
              <span>{product.category}</span>
              <div className="flex items-center gap-1.5 text-[#29232A]">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold">{product.rating}</span>
                <span className="text-slate-400 text-xs">({product.reviews} reseñas)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#29232A] font-display">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-[#C65A86] font-mono tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-base text-slate-400 line-through font-mono tabular-nums">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-xs text-emerald-700 font-semibold px-2 py-0.5 bg-emerald-50 rounded-md">
                En stock ({product.stock} disponibles)
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 bg-white rounded-2xl border border-[#F8DCE8] text-xs sm:text-sm text-[#29232A]/85 leading-relaxed space-y-2">
            <p>{product.description}</p>
            {product.materials && (
              <p className="text-xs text-[#76518F] font-medium pt-1">
                <strong>Material:</strong> {product.materials}
              </p>
            )}
            {product.features && (
              <ul className="text-xs text-[#29232A]/80 list-disc list-inside space-y-0.5 pt-1">
                {product.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#29232A] uppercase tracking-wider">
                1. Selecciona tu talla: <strong className="text-[#C65A86]">{selectedSize || 'Requerido'}</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-[#76518F] font-semibold hover:text-[#C65A86] flex items-center gap-1 underline"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Guía de tallas</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setValidationError('');
                  }}
                  className={`min-w-12 py-2 px-3.5 text-xs font-bold rounded-xl transition-all ${
                    selectedSize === size
                      ? 'bg-[#76518F] text-white shadow-md ring-2 ring-[#76518F]/30'
                      : 'bg-white text-[#29232A] border border-[#F8DCE8] hover:border-[#C65A86]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <span className="block text-xs font-bold text-[#29232A] uppercase tracking-wider mb-2">
              2. Selecciona color: <strong className="text-[#C65A86]">{selectedColor || 'Requerido'}</strong>
            </span>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setValidationError('');
                  }}
                  className={`py-1.5 px-3.5 text-xs font-semibold rounded-xl transition-all ${
                    selectedColor === color
                      ? 'bg-[#C65A86] text-white shadow-md'
                      : 'bg-white text-[#29232A] border border-[#F8DCE8] hover:border-[#C65A86]'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-[#29232A] uppercase tracking-wider">
              Cantidad:
            </span>
            <div className="flex items-center border border-[#F8DCE8] rounded-xl bg-white overflow-hidden shadow-xs">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-sm text-[#29232A] hover:bg-[#F8DCE8] transition-colors"
                aria-label="Restar prenda"
              >
                -
              </button>
              <span className="px-4 text-xs font-extrabold font-mono">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                disabled={quantity >= product.stock}
                className="px-3 py-2 text-sm text-[#29232A] hover:bg-[#F8DCE8] transition-colors disabled:opacity-30"
                aria-label="Sumar prenda"
              >
                +
              </button>
            </div>
            <span className="text-[11px] text-slate-400">Máx. {product.stock} unidades</span>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {validationError}
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleAddToCart(false)}
                className="flex-1 py-3.5 px-6 bg-[#C65A86] hover:bg-[#a9446d] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al carrito</span>
              </button>

              <button
                onClick={() => handleAddToCart(true)}
                className="flex-1 py-3.5 px-6 bg-[#76518F] hover:bg-[#603e77] text-white font-bold rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <span>Comprar ahora</span>
              </button>
            </div>

            {/* WhatsApp Consultation Action */}
            <button
              onClick={handleWhatsAppConsult}
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Consultar esta prenda por WhatsApp (+51 949 173 777)</span>
            </button>

            {/* Wishlist and Share */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => toggleFavorite(product.id)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#29232A] hover:text-[#C65A86] transition-colors py-1.5"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-[#C65A86] text-[#C65A86]' : ''}`} />
                <span>{isFav ? 'Guardado en Favoritos' : 'Añadir a mis Favoritos'}</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs text-[#76518F] font-semibold hover:underline py-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir prenda'}</span>
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="p-4 bg-white rounded-2xl border border-[#F8DCE8] grid grid-cols-2 gap-4 text-xs text-[#29232A]/80">
            <div className="flex items-start gap-2">
              <Truck className="w-4 h-4 text-[#C65A86] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#29232A]">Envíos seguros</p>
                <p className="text-[11px] text-[#29232A]/60">Puno, Juliaca y agencias a nivel nacional.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#76518F] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#29232A]">Prendas verificadas</p>
                <p className="text-[11px] text-[#29232A]/60">Revisión de costuras y medidas antes del despacho.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-[#F8DCE8]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
                También te puede interesar
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#29232A] font-display mt-0.5">
                Prendas de {product.category}
              </h2>
            </div>
            <Link
              to={`/tienda?categoria=${encodeURIComponent(product.category)}`}
              className="text-xs font-bold text-[#76518F] hover:underline"
            >
              Ver más →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

    </div>
  );
};
