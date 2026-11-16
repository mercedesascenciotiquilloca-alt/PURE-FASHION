import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Heart, ShieldCheck, Truck, RefreshCw, Send } from 'lucide-react';
import { WHATSAPP_DISPLAY, STORE_OWNER, buildWhatsAppLink, generateWhatsAppGeneralContact } from '../utils/whatsapp';
import { SizeGuideModal } from './SizeGuideModal';
import { saveNewsletterToSupabase } from '../utils/supabase';

export const Footer: React.FC = () => {
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterError('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    const cleanEmail = newsletterEmail.trim().toLowerCase();
    saveNewsletterToSupabase(cleanEmail);
    setNewsletterError('');
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  return (
    <>
      <footer className="bg-[#29232A] text-[#FFF9F5] border-t border-[#76518F]/40 pt-16 pb-12">
        {/* Newsletter Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10">
          <div className="bg-[#76518F]/20 border border-[#76518F]/40 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-md">
              <span className="text-[#C65A86] text-xs font-semibold uppercase tracking-widest">
                Novedades & Moda
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 font-display">
                Recibe novedades de moda
              </h3>
              <p className="text-sm text-[#FFF9F5]/80 mt-1">
                Descubre nuevas colecciones, tendencias y promociones exclusivas de PURÉ FASHION antes que nadie.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex-1 max-w-md">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterError) setNewsletterError('');
                  }}
                  placeholder="Tu correo electrónico..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/50 focus:outline-hidden focus:border-[#C65A86]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C65A86] hover:bg-[#a9446d] text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  <span>Suscribirme</span>
                </button>
              </div>
              {newsletterError && (
                <p className="text-xs text-rose-300 mt-2">{newsletterError}</p>
              )}
              {newsletterSuccess && (
                <p className="text-xs text-emerald-300 mt-2">
                  ¡Gracias por suscribirte a PURÉ FASHION! Te mantendremos informada.
                </p>
              )}
              <p className="text-[10px] text-white/50 mt-1.5">
                (Simulación de suscripción preparada para conexión a API de email marketing).
              </p>
            </form>
          </div>
        </div>

        {/* 4 Feature Value Pillars */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="p-2.5 rounded-xl bg-white/5 text-[#C65A86]">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Estilo actual</h4>
            <p className="text-xs text-[#FFF9F5]/70">Descubre prendas que combinan con tu personalidad.</p>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="p-2.5 rounded-xl bg-white/5 text-[#C65A86]">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Compra sencilla</h4>
            <p className="text-xs text-[#FFF9F5]/70">Encuentra tus prendas favoritas desde tu celular o computadora.</p>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="p-2.5 rounded-xl bg-white/5 text-[#C65A86]">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Atención cercana</h4>
            <p className="text-xs text-[#FFF9F5]/70">Consulta tallas, colores y disponibilidad mediante WhatsApp.</p>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="p-2.5 rounded-xl bg-white/5 text-[#C65A86]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Información transparente</h4>
            <p className="text-xs text-[#FFF9F5]/70">Revisa precios, características y condiciones antes de pedir.</p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            
            {/* Col 1: Brand Info */}
            <div className="col-span-2 md:col-span-1">
              <span className="text-2xl font-black tracking-tight text-white font-display">
                PURÉ <span className="text-[#C65A86]">FASHION</span>
              </span>
              <p className="text-xs text-[#FFF9F5]/70 mt-3 leading-relaxed">
                Moda femenina y urbana seleccionada con dedicación para ofrecerte elegancia, comodidad y versatilidad.
              </p>
              <div className="mt-4 text-xs text-[#FFF9F5]/80 space-y-1">
                <p><span className="text-[#C65A86] font-medium">Propietaria:</span> {STORE_OWNER}</p>
                <p className="flex items-center gap-1.5 mt-1 text-[#FFF9F5]/70">
                  <MapPin className="w-3.5 h-3.5 text-[#C65A86] shrink-0" />
                  <span>Juliaca, Puno, Perú</span>
                </p>
              </div>
            </div>

            {/* Col 2: Tienda */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C65A86] mb-4">
                Tienda
              </h4>
              <ul className="space-y-2.5 text-xs text-[#FFF9F5]/80">
                <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
                <li><Link to="/tienda" className="hover:text-white transition-colors">Tienda completa</Link></li>
                <li><Link to="/categorias" className="hover:text-white transition-colors">Categorías</Link></li>
                <li><Link to="/nueva-coleccion" className="hover:text-white transition-colors">Nueva colección</Link></li>
                <li><Link to="/ofertas" className="hover:text-white transition-colors">Ofertas</Link></li>
              </ul>
            </div>

            {/* Col 3: Atención al cliente */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C65A86] mb-4">
                Atención al cliente
              </h4>
              <ul className="space-y-2.5 text-xs text-[#FFF9F5]/80">
                <li><Link to="/faq" className="hover:text-white transition-colors">Preguntas frecuentes</Link></li>
                <li>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    Guía de tallas
                  </button>
                </li>
                <li><Link to="/faq#envios" className="hover:text-white transition-colors">Envíos y cobertura</Link></li>
                <li><Link to="/faq#cambios" className="hover:text-white transition-colors">Cambios y devoluciones</Link></li>
                <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto directo</Link></li>
              </ul>
            </div>

            {/* Col 4: Empresa & Legal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C65A86] mb-4">
                Empresa & Legal
              </h4>
              <ul className="space-y-2.5 text-xs text-[#FFF9F5]/80">
                <li><Link to="/nosotros" className="hover:text-white transition-colors">Nosotros</Link></li>
                <li><Link to="/nosotros#marca" className="hover:text-white transition-colors">Nuestra marca</Link></li>
                <li><Link to="/politicas-de-privacidad" className="hover:text-white transition-colors">Política de privacidad</Link></li>
                <li><Link to="/terminos-y-condiciones" className="hover:text-white transition-colors">Términos y condiciones</Link></li>
              </ul>
            </div>

            {/* Col 5: Contacto Directo */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C65A86] mb-4">
                Contacto Oficial
              </h4>
              <div className="space-y-3 text-xs text-[#FFF9F5]/80">
                <p>PURÉ FASHION</p>
                <p>Ubicación: Juliaca, Puno, Perú</p>
                <p className="font-semibold text-white">WhatsApp de Pedidos:</p>
                <a
                  href={buildWhatsAppLink(generateWhatsAppGeneralContact())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{WHATSAPP_DISPLAY}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF9F5]/50 text-center sm:text-left">
            <p>© 2026 PURÉ FASHION. Todos los derechos reservados.</p>
            <p>
              Prendas demostrativas para PURÉ FASHION · Diseñado para Puno y Juliaca, Perú
            </p>
          </div>
        </div>
      </footer>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </>
  );
};
