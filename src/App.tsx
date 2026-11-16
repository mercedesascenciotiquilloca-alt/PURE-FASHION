import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { StoreDataProvider } from './context/StoreDataContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { NotificationToast } from './components/NotificationToast';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { Collections } from './pages/Collections';
import { Offers } from './pages/Offers';
import { Favorites } from './pages/Favorites';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

// Auto scroll to top on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreDataProvider>
        <CartProvider>
          <FavoritesProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#29232A]">
              <Header />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tienda" element={<Shop />} />
                  <Route path="/catalogo" element={<Shop />} />
                  <Route path="/categorias" element={<CategoriesPage />} />
                  <Route path="/producto/:slug" element={<ProductDetail />} />
                  <Route path="/carrito" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/nosotros" element={<About />} />
                  <Route path="/nueva-coleccion" element={<Collections />} />
                  <Route path="/ofertas" element={<Offers />} />
                  <Route path="/favoritos" element={<Favorites />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/politicas-de-privacidad" element={<Privacy />} />
                  <Route path="/terminos-y-condiciones" element={<Terms />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>

              <Footer />

              {/* Overlays & Drawers */}
              <CartDrawer />
              <NotificationToast />
              <WhatsAppButton />
            </div>
          </FavoritesProvider>
        </CartProvider>
      </StoreDataProvider>
    </BrowserRouter>
  );
}
