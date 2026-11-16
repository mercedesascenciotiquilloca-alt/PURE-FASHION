import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Truck, MessageCircle, Star } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { WHATSAPP_DISPLAY, buildWhatsAppLink, generateWhatsAppGeneralContact } from '../utils/whatsapp';
import { useStoreData } from '../context/StoreDataContext';

export const Home: React.FC = () => {
  const { products, categories } = useStoreData();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8DCE8]/30 to-[#FFF9F5] border-b border-[#F8DCE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8DCE8] text-[#76518F] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#C65A86]" />
                <span>Colección Temporada · Puno, Perú</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#29232A] tracking-tight font-display leading-[1.15]">
                Tu estilo, tu esencia, <br className="hidden sm:inline" />
                <span className="text-[#C65A86]">tu momento.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#29232A]/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Descubre las últimas tendencias y encuentra las prendas que reflejan tu personalidad con <strong>PURÉ FASHION</strong>. Moda moderna, cómoda y pensada para ti.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/tienda"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#C65A86] hover:bg-[#a9446d] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm flex items-center justify-center gap-2"
                >
                  <span>Comprar ahora</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/nueva-coleccion"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-[#F8DCE8]/40 text-[#76518F] font-bold rounded-2xl border border-[#F8DCE8] transition-all text-sm flex items-center justify-center gap-2"
                >
                  <span>Descubrir colección</span>
                </Link>
              </div>

              {/* Trust Subtext */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#29232A]/70">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C65A86]" />
                  <span>Atención directa por WhatsApp</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#C65A86]" />
                  <span>Envíos a Puno, Juliaca y todo el Perú</span>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F8DCE8]">
                  <img
                    src="/src/assets/images/pure_fashion_hero_1792444594718.jpg"
                    alt="Colección de moda PURÉ FASHION"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Floating highlight card */}
                <div className="absolute -bottom-5 -left-4 sm:left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#F8DCE8] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F8DCE8] flex items-center justify-center text-[#C65A86]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#29232A]">Prendas Exclusivas</p>
                    <p className="text-[10px] text-[#76518F]">Calidad y elegancia garantizada</p>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 bg-[#76518F] text-white px-3 py-1.5 rounded-xl shadow-lg text-[11px] font-bold">
                  S/ 29.90 desde
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION: "Encuentra tu estilo" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
              Categorías de Ropa
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#29232A] font-display mt-1">
              Encuentra tu estilo
            </h2>
          </div>
          <Link
            to="/categorias"
            className="text-xs font-bold text-[#76518F] hover:text-[#C65A86] flex items-center gap-1.5 transition-colors"
          >
            <span>Ver todas las categorías</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {categories.slice(0, 10).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS: "Los favoritos de la temporada" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
              Destacados
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#29232A] font-display mt-1">
              Los favoritos de la temporada
            </h2>
            <p className="text-xs sm:text-sm text-[#29232A]/70 mt-1 max-w-xl">
              Nuestras prendas más solicitadas en poleras, blusas, jeans y casacas para lucir impecable en todo momento.
            </p>
          </div>

          <Link
            to="/tienda"
            className="text-xs font-bold text-[#76518F] hover:text-[#C65A86] flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <span>Explorar todo el catálogo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* PROMOTIONAL CAMPAIGN BANNER: "Lo nuevo de PURÉ FASHION" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#29232A] via-[#76518F]/90 to-[#C65A86]/90 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-4">
              <span className="px-3 py-1 bg-white/20 text-[#FFF9F5] text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-xs">
                Nueva Colección
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
                Prendas pensadas para destacar tu esencia
              </h2>
              <p className="text-sm sm:text-base text-white/80 max-w-lg leading-relaxed">
                Texturas suaves, siluetas favorecedoras y paletas de color contemporáneas para renovar tu armario con distinción.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/nueva-coleccion"
                  className="px-6 py-3 bg-white text-[#29232A] hover:bg-[#F8DCE8] font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-md"
                >
                  Ver Nueva Colección
                </Link>
                <a
                  href={buildWhatsAppLink(generateWhatsAppGeneralContact())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full relative overflow-hidden">
              <img
                src="/src/assets/images/pure_collection_banner_1792444594689.jpg"
                alt="Looks nuevos de PURÉ FASHION"
                className="w-full h-full object-cover object-center"
              />
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE PURÉ FASHION (4 visual blocks) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
            Nuestros Valores
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#29232A] font-display mt-1">
            ¿Por qué elegir PURÉ FASHION?
          </h2>
          <p className="text-xs sm:text-sm text-[#29232A]/70 mt-2">
            Trabajamos con amor y dedicación para brindarte la mejor experiencia de compra de ropa en Puno y el sur del país.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#F8DCE8] shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#F8DCE8] text-[#C65A86] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#29232A] mb-1">Estilo actual</h3>
            <p className="text-xs text-[#29232A]/70 leading-relaxed">
              Descubre prendas que combinan con tu personalidad y siguen las tendencias de cada temporada.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#F8DCE8] shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#F8DCE8] text-[#76518F] flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#29232A] mb-1">Compra sencilla</h3>
            <p className="text-xs text-[#29232A]/70 leading-relaxed">
              Encuentra tus prendas favoritas desde tu celular o computadora en pocos clics sin complicaciones.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#F8DCE8] shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#F8DCE8] text-[#25D366] flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#29232A] mb-1">Atención cercana</h3>
            <p className="text-xs text-[#29232A]/70 leading-relaxed">
              Consulta tallas, colores y disponibilidad mediante WhatsApp con respuesta rápida y cordial.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#F8DCE8] shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#F8DCE8] text-[#C65A86] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#29232A] mb-1">Información transparente</h3>
            <p className="text-xs text-[#29232A]/70 leading-relaxed">
              Revisa precios, características y condiciones antes de realizar tu pedido con total seguridad.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION (With required demo disclaimer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
            Opiniones de Demostración
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#29232A] font-display mt-1">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-[11px] text-slate-500 italic mt-1">
            (Nota: Las siguientes opiniones son testimonios de demostración identificados para el desarrollo del sitio).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Valeria Quispe',
              city: 'Juliaca, Puno',
              comment: 'La casaca acolchada que pedí me llegó impecable. Abriga excelente para las mañanas frías de Juliaca.',
              rating: 5,
              product: 'Casaca Urban Puffer'
            },
            {
              name: 'Camila Mamani',
              city: 'Puno Ciudad',
              comment: 'La atención por WhatsApp de Mercedes fue súper amable y me asesoró con la talla exacta de la blusa satinada.',
              rating: 5,
              product: 'Blusa Elegance Satinada'
            },
            {
              name: 'Rosa Huanca',
              city: 'Ilave, Puno',
              comment: 'El jean wide leg tiene una caída perfecta y no se encogió al lavarlo. Definitivamente volveré a pedir.',
              rating: 5,
              product: 'Pantalón Wide Leg Denim'
            },
            {
              name: 'Andrea Condori',
              city: 'Arequipa / Puno',
              comment: 'Precios súper accesibles en soles y la ropa es idéntica a las fotos. Muy recomendada PURÉ FASHION.',
              rating: 5,
              product: 'Conjunto Soft Style'
            }
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-3xl border border-[#F8DCE8] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#29232A]/80 leading-relaxed mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#F8DCE8]/60 text-xs">
                <p className="font-bold text-[#29232A]">{t.name}</p>
                <p className="text-[10px] text-[#76518F]">{t.city}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Prenda: {t.product}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM & SOCIAL GALLERY: "Inspírate con PURÉ FASHION" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
            Comunidad & Moda
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#29232A] font-display mt-1">
            Inspírate con PURÉ FASHION
          </h2>
          <p className="text-xs text-[#29232A]/70 mt-1">
            Ideas de combinaciones, tendencias y outfits reales para cada ocasión.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80', label: '#LookDelDia' },
            { img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80', label: '#PureElegance' },
            { img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80', label: '#StreetStyle' },
            { img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80', label: '#VestidosChic' },
            { img: 'https://images.unsplash.com/photo-1544022613-e87ce7526edb?w=600&auto=format&fit=crop&q=80', label: '#CasacasPuno' },
            { img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80', label: '#BlusasTrend' },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F8DCE8] border border-[#F8DCE8]"
            >
              <img
                src={item.img}
                alt={item.label}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#76518F]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                <span className="text-[11px] font-bold text-white tracking-wide">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-[#29232A]/70">
            ¿Quieres coordinar una prenda? Escríbenos directamente a WhatsApp:{' '}
            <a
              href={buildWhatsAppLink(generateWhatsAppGeneralContact())}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#25D366] hover:underline"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </p>
        </div>
      </section>

    </div>
  );
};
