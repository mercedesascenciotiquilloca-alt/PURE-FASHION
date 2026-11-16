import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, Phone, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { WHATSAPP_DISPLAY, buildWhatsAppLink, generateWhatsAppGeneralContact } from '../utils/whatsapp';
import { SupabaseStatusBadge } from './SupabaseStatusBadge';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, openCartDrawer } = useCart();
  const { favoritesCount } = useFavorites();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tienda?busqueda=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Tienda', path: '/tienda' },
    { label: 'Mujer', path: '/tienda?genero=Mujer' },
    { label: 'Hombre', path: '/tienda?genero=Hombre' },
    { label: 'Nuevas colecciones', path: '/nueva-coleccion' },
    { label: 'Ofertas', path: '/ofertas' },
    { label: 'Nosotros', path: '/nosotros' },
    { label: 'Contacto', path: '/contacto' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname + location.search === path) return true;
    if (path === '/tienda' && location.pathname === '/tienda' && !location.search) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F5]/95 backdrop-blur-md border-b border-[#F8DCE8] transition-all">
      {/* Top Notice Bar */}
      <div className="bg-[#76518F] text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto whitespace-nowrap">
          <span>✨ Descubre tu estilo</span>
          <span className="opacity-60">|</span>
          <span>🚚 Consulta nuestros envíos a todo Puno y Perú</span>
          <span className="opacity-60">|</span>
          <span>💗 Moda para cada ocasión</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#29232A] hover:text-[#C65A86] rounded-xl hover:bg-[#F8DCE8]/40 transition-colors"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link
            to="/"
            className="flex flex-col items-start shrink-0 group focus-visible:outline-[#C65A86]"
          >
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#29232A] font-display group-hover:text-[#C65A86] transition-colors">
              PURÉ <span className="text-[#C65A86] font-light">FASHION</span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#76518F] font-medium -mt-1">
              Moda & Tendencia · Puno
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-auto relative items-center"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿Qué prenda estás buscando?"
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#F8DCE8] rounded-full focus:outline-hidden focus:border-[#C65A86] focus:ring-2 focus:ring-[#F8DCE8] transition-all text-[#29232A] placeholder:text-[#29232A]/50 shadow-xs"
            />
            <Search className="w-4 h-4 text-[#76518F] absolute left-3.5 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1 bg-[#C65A86] hover:bg-[#a9446d] text-white text-xs font-medium rounded-full transition-colors"
            >
              Buscar
            </button>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            {/* Supabase Database Connection Badge & Sync Modal */}
            <SupabaseStatusBadge />

            {/* User Account / Store Info Modal */}
            <div className="relative">
              <button
                onClick={() => setUserModalOpen(!userModalOpen)}
                className="p-2 sm:p-2.5 text-[#29232A] hover:text-[#C65A86] hover:bg-[#F8DCE8]/40 rounded-full transition-colors"
                aria-label="Perfil y datos de la tienda"
                title="Información de la tienda y cliente"
              >
                <User className="w-5 h-5" />
              </button>

              {userModalOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#F8DCE8] p-4 text-xs text-[#29232A] z-50 animate-fadeIn">
                  <div className="pb-3 border-b border-[#F8DCE8]">
                    <p className="font-bold text-sm text-[#29232A]">PURÉ FASHION</p>
                    <p className="text-[#C65A86] font-medium">Propietaria: Mercedes Ascencio Tiquilloca</p>
                    <p className="text-slate-500 mt-0.5">Puno & Juliaca, Perú</p>
                  </div>
                  <div className="py-2.5 space-y-1.5">
                    <p className="text-slate-600">
                      Bienvenida a nuestra tienda online de moda femenina y urbana.
                    </p>
                    <a
                      href={buildWhatsAppLink(generateWhatsAppGeneralContact())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#25D366] font-semibold hover:underline pt-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{WHATSAPP_DISPLAY}</span>
                    </a>
                  </div>
                  <div className="pt-2 border-t border-[#F8DCE8] flex gap-2">
                    <Link
                      to="/nosotros"
                      onClick={() => setUserModalOpen(false)}
                      className="flex-1 text-center py-1.5 px-2 bg-[#F8DCE8]/60 hover:bg-[#F8DCE8] text-[#76518F] font-semibold rounded-lg transition-colors"
                    >
                      Conócenos
                    </Link>
                    <button
                      onClick={() => setUserModalOpen(false)}
                      className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Favorites Icon */}
            <Link
              to="/favoritos"
              className="p-2 sm:p-2.5 text-[#29232A] hover:text-[#C65A86] hover:bg-[#F8DCE8]/40 rounded-full transition-colors relative"
              aria-label="Ver prendas favoritas"
              title="Favoritos guardados"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C65A86] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <button
              onClick={openCartDrawer}
              className="p-2 sm:p-2.5 text-[#29232A] hover:text-[#C65A86] hover:bg-[#F8DCE8]/40 rounded-full transition-colors relative"
              aria-label="Abrir carrito de compras"
              title="Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#76518F] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scaleIn">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <form onSubmit={handleSearchSubmit} className="mt-3 md:hidden relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="¿Qué prenda estás buscando?"
            className="w-full pl-9 pr-16 py-2 text-xs bg-white border border-[#F8DCE8] rounded-full text-[#29232A] placeholder:text-[#29232A]/50 focus:outline-hidden focus:border-[#C65A86]"
          />
          <Search className="w-3.5 h-3.5 text-[#76518F] absolute left-3 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-1.5 px-2.5 py-1 bg-[#C65A86] text-white text-[11px] font-medium rounded-full"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Main Desktop Navigation Menu */}
      <nav className="hidden md:block border-t border-[#F8DCE8]/60 bg-[#FFF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-8 py-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs uppercase tracking-wider font-semibold transition-colors py-1 relative ${
                  isActive(link.path)
                    ? 'text-[#C65A86]'
                    : 'text-[#29232A]/80 hover:text-[#C65A86]'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C65A86] rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[110px] bottom-0 bg-black/40 backdrop-blur-xs z-50 animate-fadeIn">
          <div className="bg-[#FFF9F5] w-full max-w-sm p-6 shadow-2xl h-full overflow-y-auto border-r border-[#F8DCE8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#F8DCE8]">
              <div>
                <p className="font-extrabold text-[#29232A] font-display text-lg">PURÉ FASHION</p>
                <p className="text-[10px] uppercase tracking-wider text-[#C65A86]">Menú de Navegación</p>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-[#F8DCE8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'bg-[#F8DCE8] text-[#C65A86]'
                      : 'text-[#29232A] hover:bg-[#F8DCE8]/50 hover:text-[#C65A86]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-[#F8DCE8] space-y-3">
              <Link
                to="/favoritos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-sm text-[#29232A] hover:bg-[#F8DCE8]/40 rounded-xl"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#C65A86]" /> Favoritos
                </span>
                <span className="text-xs font-bold text-[#C65A86]">{favoritesCount}</span>
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCartDrawer();
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-[#29232A] hover:bg-[#F8DCE8]/40 rounded-xl"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#76518F]" /> Carrito
                </span>
                <span className="text-xs font-bold text-[#76518F]">{totalItems} prendas</span>
              </button>

              <a
                href={buildWhatsAppLink(generateWhatsAppGeneralContact())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-xl font-semibold text-xs shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Pedir por WhatsApp: {WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
