import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Truck, ShieldCheck, Phone, MapPin, User, ArrowRight } from 'lucide-react';
import { WHATSAPP_DISPLAY, STORE_OWNER, buildWhatsAppLink, generateWhatsAppGeneralContact } from '../utils/whatsapp';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Hero About */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
          Conoce Nuestra Historia
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#29232A] font-display">
          Bienvenida a PURÉ FASHION
        </h1>
        <p className="text-base sm:text-lg text-[#29232A]/85 leading-relaxed pt-2">
          "PURÉ FASHION nace con la idea de ofrecer prendas que te ayuden a expresar tu personalidad y sentirte bien con tu estilo. Queremos que encontrar ropa que te guste sea una experiencia sencilla, agradable y cercana."
        </p>
      </section>

      {/* Founder & Brand Lockup */}
      <section id="marca" className="bg-white rounded-3xl border border-[#F8DCE8] p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="aspect-4/5 rounded-2xl overflow-hidden bg-[#F8DCE8] shadow-md border-2 border-[#F8DCE8]">
              <img
                src="/src/assets/images/pure_fashion_hero_1792444594718.jpg"
                alt="Identidad PURÉ FASHION"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-2 sm:right-4 bg-white p-3.5 rounded-2xl shadow-lg border border-[#F8DCE8]">
              <p className="text-[10px] text-[#76518F] font-bold uppercase tracking-wider">Propietaria</p>
              <p className="text-xs font-bold text-[#29232A]">{STORE_OWNER}</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
                Identidad de Marca
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#29232A] font-display mt-1">
                Elegancia cotidiana y moda para cada momento
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#29232A]/80 leading-relaxed">
              <p>
                En <strong>PURÉ FASHION</strong> seleccionamos prendas que combinan las tendencias más actuales con la comodidad que exiges cada día. Creemos que la moda no es solo verse bien, sino sentirse segura, cómoda y auténtica con lo que llevas puesto.
              </p>
              <p>
                Operamos desde la región de <strong>Puno (Juliaca y Puno ciudad)</strong>, llevando opciones de vestir a mujeres y jóvenes que aprecian el buen gusto, los cortes favorecedores y los tejidos de alta durabilidad.
              </p>
            </div>

            <div className="p-4 bg-[#FFF9F5] rounded-2xl border border-[#F8DCE8] flex flex-col sm:flex-row gap-4 sm:items-center justify-between text-xs">
              <div className="space-y-1">
                <p className="font-bold text-[#29232A] flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#C65A86]" />
                  <span>Propietaria: {STORE_OWNER}</span>
                </p>
                <p className="text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#76518F]" />
                  <span>Ubicación comercial: Puno / Juliaca, Perú</span>
                </p>
              </div>

              <a
                href={buildWhatsAppLink(generateWhatsAppGeneralContact())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white font-bold rounded-xl text-xs shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 4 Visual Pillars */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
            Pilares
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#29232A] font-display mt-1">
            Nuestros Compromisos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#F8DCE8] shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F8DCE8] text-[#C65A86] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#29232A] mb-1">Estilo actual</h3>
            <p className="text-xs text-[#29232A]/70 leading-relaxed">
              Descubre prendas que combinan con tu personalidad y reflejan lo mejor de la moda contemporánea.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#F8DCE8] shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F8DCE8] text-[#76518F] flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#29232A] mb-1">Compra sencilla</h3>
            <p className="text-xs text-[#29232A]/70 leading-relaxed">
              Encuentra tus prendas favoritas desde tu celular o computadora con una experiencia fluida.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#F8DCE8] shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F8DCE8] text-[#25D366] flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#29232A] mb-1">Atención cercana</h3>
            <p className="text-xs text-[#29232A]/70 leading-relaxed">
              Consulta tallas, colores y disponibilidad mediante WhatsApp con trato amable y personalizado.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#F8DCE8] shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F8DCE8] text-[#C65A86] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#29232A] mb-1">Información transparente</h3>
            <p className="text-xs text-[#29232A]/70 leading-relaxed">
              Revisa precios, características y condiciones antes de realizar tu pedido con total confianza.
            </p>
          </div>
        </div>
      </section>

      {/* CTA to Shop */}
      <section className="text-center py-12 bg-white rounded-3xl border border-[#F8DCE8] p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-[#29232A] font-display mb-2">
          ¿Lista para encontrar tu próxima prenda favorita?
        </h3>
        <p className="text-xs sm:text-sm text-[#29232A]/70 max-w-md mx-auto mb-6">
          Explora nuestro catálogo con más de 20 prendas listas para combinar y lucir en cualquier ocasión.
        </p>
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C65A86] hover:bg-[#a9446d] text-white font-bold rounded-2xl text-xs sm:text-sm transition-colors shadow-md"
        >
          <span>Ir a la Tienda</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
};
