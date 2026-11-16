import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, RotateCcw, Tag } from 'lucide-react';
import { ProductGrid } from '../components/ProductGrid';
import { useStoreData } from '../context/StoreDataContext';

export const Shop: React.FC = () => {
  const { products, categories } = useStoreData();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter States initialized from URL or defaults
  const [searchTerm, setSearchTerm] = useState(searchParams.get('busqueda') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || 'all');
  const [selectedGender, setSelectedGender] = useState(searchParams.get('genero') || 'all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [priceRange, setPriceRange] = useState<number>(150);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState('recientes');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync URL params when changed from header
  useEffect(() => {
    const q = searchParams.get('busqueda');
    const cat = searchParams.get('categoria');
    const gen = searchParams.get('genero');

    if (q !== null) setSearchTerm(q);
    if (cat !== null) setSelectedCategory(cat);
    if (gen !== null) setSelectedGender(gen);
  }, [searchParams]);

  // Extract distinct sizes & colors from data
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  const allColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.colors.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [products]);

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Gender
      if (selectedGender !== 'all') {
        if (product.gender !== selectedGender) return false;
      }

      // Size
      if (selectedSize !== 'all') {
        if (!product.sizes.includes(selectedSize)) return false;
      }

      // Color
      if (selectedColor !== 'all') {
        if (!product.colors.some((c) => c.toLowerCase().includes(selectedColor.toLowerCase()))) {
          return false;
        }
      }

      // Price
      if (product.price > priceRange) return false;

      // In stock
      if (onlyInStock && product.stock <= 0) return false;

      // On sale
      if (onlyOnSale && (!product.oldPrice || product.oldPrice <= product.price)) return false;

      // Rating
      if (product.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'precio-asc') return a.price - b.price;
      if (sortBy === 'precio-desc') return b.price - a.price;
      if (sortBy === 'mas-vendidos') return b.reviews - a.reviews;
      if (sortBy === 'mejor-valorados') return b.rating - a.rating;
      // recientes default
      return b.id - a.id;
    });
  }, [
    searchTerm,
    selectedCategory,
    selectedGender,
    selectedSize,
    selectedColor,
    priceRange,
    onlyInStock,
    onlyOnSale,
    minRating,
    sortBy
  ]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedGender('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setPriceRange(150);
    setOnlyInStock(false);
    setOnlyOnSale(false);
    setMinRating(0);
    setSortBy('recientes');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'all' ||
    selectedGender !== 'all' ||
    selectedSize !== 'all' ||
    selectedColor !== 'all' ||
    priceRange < 150 ||
    onlyInStock ||
    onlyOnSale ||
    minRating > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header Banner */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
          Catálogo Oficial
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#29232A] font-display mt-1">
          Tienda de Ropa PURÉ FASHION
        </h1>
        <p className="text-xs sm:text-sm text-[#29232A]/70 mt-1 max-w-2xl">
          Explora blusas, poleras, jeans, casacas y conjuntos. Selecciona tu talla, revisa las medidas y realiza tu pedido directo.
        </p>
      </div>

      {/* Main Grid: Filters on Left, Catalog on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#F8DCE8] shadow-xs">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 text-xs font-bold text-[#76518F]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C65A86]" />
            <span>Filtrar y Ordenar</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#C65A86]" />
            )}
          </button>

          <span className="text-xs text-[#29232A]/70 font-mono">
            {filteredProducts.length} prendas
          </span>
        </div>

        {/* Left Column: Filter Sidebar (Desktop) */}
        <aside
          className={`
            lg:block lg:sticky lg:top-24 bg-white rounded-3xl border border-[#F8DCE8] p-6 space-y-6 shadow-xs
            ${mobileFiltersOpen ? 'fixed inset-0 z-50 overflow-y-auto m-0 rounded-none' : 'hidden'}
          `}
        >
          {/* Mobile close */}
          <div className="lg:hidden flex items-center justify-between pb-4 border-b border-[#F8DCE8]">
            <h3 className="font-bold text-base text-[#29232A]">Filtros de Búsqueda</h3>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="p-1 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search box inside filter sidebar */}
          <div>
            <label htmlFor="search-input" className="block text-xs font-bold text-[#76518F] uppercase tracking-wider mb-2">
              Buscar por prenda
            </label>
            <div className="relative">
              <input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar prendas..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl text-[#29232A] focus:outline-hidden focus:border-[#C65A86]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  aria-label="Borrar búsqueda"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Gender Filter */}
          <div>
            <span className="block text-xs font-bold text-[#76518F] uppercase tracking-wider mb-2">
              Sección
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FFF9F5] rounded-xl border border-[#F8DCE8]">
              {['all', 'Mujer', 'Hombre'].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-colors capitalize ${
                    selectedGender === g
                      ? 'bg-[#C65A86] text-white shadow-xs'
                      : 'text-[#29232A]/70 hover:text-[#29232A]'
                  }`}
                >
                  {g === 'all' ? 'Todos' : g}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <span className="block text-xs font-bold text-[#76518F] uppercase tracking-wider mb-2">
              Categorías
            </span>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-[#F8DCE8] text-[#C65A86] font-bold'
                    : 'text-[#29232A]/80 hover:bg-[#FFF9F5]'
                }`}
              >
                <span>Todas las categorías</span>
                <span className="text-[10px] text-slate-400">{products.length}</span>
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'bg-[#F8DCE8] text-[#C65A86] font-bold'
                      : 'text-[#29232A]/80 hover:bg-[#FFF9F5]'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] text-slate-400">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <span className="block text-xs font-bold text-[#76518F] uppercase tracking-wider mb-2">
              Talla
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSize('all')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  selectedSize === 'all'
                    ? 'bg-[#76518F] text-white shadow-xs'
                    : 'bg-[#FFF9F5] text-[#29232A] border border-[#F8DCE8] hover:border-[#C65A86]'
                }`}
              >
                Todas
              </button>
              {allSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    selectedSize === s
                      ? 'bg-[#76518F] text-white shadow-xs'
                      : 'bg-[#FFF9F5] text-[#29232A] border border-[#F8DCE8] hover:border-[#C65A86]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-bold text-[#76518F] uppercase tracking-wider">
                Precio máximo:
              </span>
              <span className="font-extrabold text-[#C65A86] font-mono">
                S/ {priceRange.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#C65A86] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>S/ 20.00</span>
              <span>S/ 150.00</span>
            </div>
          </div>

          {/* Availability & Offers Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-[#F8DCE8]/60 text-xs text-[#29232A]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded-sm text-[#C65A86] focus:ring-[#C65A86] border-[#F8DCE8]"
              />
              <span>Solo prendas en stock</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyOnSale}
                onChange={(e) => setOnlyOnSale(e.target.checked)}
                className="rounded-sm text-[#C65A86] focus:ring-[#C65A86] border-[#F8DCE8]"
              />
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#C65A86]" />
                <span>Solo productos en oferta</span>
              </span>
            </label>
          </div>

          {/* Clear Filters Action */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-[#29232A] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          )}

          {/* Mobile view apply button */}
          <div className="lg:hidden pt-4">
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3 bg-[#C65A86] text-white font-bold rounded-xl text-xs"
            >
              Ver {filteredProducts.length} prendas
            </button>
          </div>
        </aside>

        {/* Right Column: Catalog Grid & Sorting */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Sorting and Results Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#F8DCE8] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <p className="text-xs text-[#29232A]/70">
              Mostrando <strong className="text-[#29232A] font-mono">{filteredProducts.length}</strong> prendas encontradas
            </p>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label htmlFor="sort-select" className="text-xs text-[#76518F] font-semibold whitespace-nowrap">
                Ordenar por:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto text-xs px-3 py-1.5 bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl text-[#29232A] focus:outline-hidden focus:border-[#C65A86]"
              >
                <option value="recientes">Más recientes</option>
                <option value="precio-asc">Precio: de menor a mayor</option>
                <option value="precio-desc">Precio: de mayor a menor</option>
                <option value="mas-vendidos">Más vendidos</option>
                <option value="mejor-valorados">Mejor valorados</option>
              </select>
            </div>
          </div>

          {/* Active filter tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400">Filtros aplicados:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F8DCE8] text-[#76518F] font-medium rounded-lg">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} aria-label="Quitar filtro de texto"><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F8DCE8] text-[#76518F] font-medium rounded-lg">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} aria-label="Quitar filtro de categoría"><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedSize !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F8DCE8] text-[#76518F] font-medium rounded-lg">
                  Talla {selectedSize}
                  <button onClick={() => setSelectedSize('all')} aria-label="Quitar filtro de talla"><X className="w-3 h-3" /></button>
                </span>
              )}
              {onlyOnSale && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-100 text-[#C65A86] font-medium rounded-lg">
                  En Oferta
                  <button onClick={() => setOnlyOnSale(false)} aria-label="Quitar filtro de oferta"><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                onClick={handleClearFilters}
                className="text-xs text-[#C65A86] font-semibold hover:underline ml-2"
              >
                Limpiar todo
              </button>
            </div>
          )}

          {/* Product Grid */}
          <ProductGrid
            products={filteredProducts}
            emptyMessage="No encontramos prendas que coincidan con estos criterios. Prueba ajustando el rango de precios o limpiando los filtros."
          />

        </div>
      </div>

    </div>
  );
};
