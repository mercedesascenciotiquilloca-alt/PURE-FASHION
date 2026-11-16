import React, { useState } from 'react';
import { Phone, MapPin, User, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_DISPLAY, STORE_OWNER, buildWhatsAppLink } from '../utils/whatsapp';
import { saveInquiryToSupabase } from '../utils/supabase';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('Consulta de prendas');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendByWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // Save inquiry to Supabase
    saveInquiryToSupabase({
      customer_name: name || undefined,
      topic,
      message,
    });

    let text = `Hola PURÉ FASHION,\n\n`;
    if (name) text += `Mi nombre es: ${name}\n`;
    text += `Tema: ${topic}\n`;
    if (message) text += `Mensaje: ${message}\n`;
    text += `\n¿Podrían brindarme información? Muchas gracias.`;

    const url = buildWhatsAppLink(text);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
          Atención Personalizada
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#29232A] font-display mt-1">
          Contacto Directo
        </h1>
        <p className="text-xs sm:text-sm text-[#29232A]/70 mt-2">
          Estamos aquí para resolver tus dudas sobre tallas, disponibilidad y envíos a todo Puno y el Perú.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Information Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#F8DCE8] p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-[#29232A] font-display">
              Información de la Tienda
            </h2>
            <p className="text-xs text-[#29232A]/70 mt-1">
              Atención directa y personalizada con la propietaria.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#29232A]">
            <div className="flex items-start gap-3 p-3.5 bg-[#FFF9F5] rounded-2xl border border-[#F8DCE8]">
              <div className="p-2 bg-[#F8DCE8] text-[#C65A86] rounded-xl shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#76518F] font-bold">Comercio & Propietaria</p>
                <p className="font-extrabold text-[#29232A] text-sm">PURÉ FASHION</p>
                <p className="text-slate-600">{STORE_OWNER}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-[#FFF9F5] rounded-2xl border border-[#F8DCE8]">
              <div className="p-2 bg-[#F8DCE8] text-[#76518F] rounded-xl shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#76518F] font-bold">Ubicación Comercial</p>
                <p className="font-bold text-[#29232A]">Juliaca, Puno, Perú</p>
                <p className="text-slate-600 text-xs">Despachos a nivel regional y nacional</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 bg-[#FFF9F5] rounded-2xl border border-[#F8DCE8]">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold">Línea Oficial WhatsApp</p>
                <p className="font-bold text-[#29232A] text-sm">{WHATSAPP_DISPLAY}</p>
                <p className="text-slate-600 text-xs">Consultas, pedidos y confirmaciones</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/51949173777`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Escríbenos por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Interactive Message Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#F8DCE8] p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-[#29232A] font-display">
              Envíanos una consulta rápida
            </h2>
            <p className="text-xs text-[#29232A]/70 mt-1">
              Prepara tu mensaje para enviarlo directamente a nuestro WhatsApp oficial.
            </p>
          </div>

          <form onSubmit={handleSendByWhatsApp} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold text-[#29232A] mb-1">
                Tu nombre
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Carmen Sánchez"
                required
                className="w-full px-3.5 py-2.5 text-xs bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl text-[#29232A] focus:outline-hidden focus:border-[#C65A86]"
              />
            </div>

            <div>
              <label htmlFor="contact-topic" className="block text-xs font-semibold text-[#29232A] mb-1">
                Motivo de tu consulta
              </label>
              <select
                id="contact-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl text-[#29232A]"
              >
                <option value="Consulta sobre una prenda o talla">Consulta sobre una prenda o talla</option>
                <option value="Pregunta sobre envíos a mi ciudad">Pregunta sobre envíos a mi ciudad</option>
                <option value="Consulta de disponibilidad de colores">Consulta de disponibilidad de colores</option>
                <option value="Pedidos por mayor o especiales">Pedidos especiales</option>
                <option value="Otro">Otro asunto</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-[#29232A] mb-1">
                Mensaje o prenda que buscas
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Escribe tu consulta aquí..."
                required
                className="w-full px-3.5 py-2.5 text-xs bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl text-[#29232A] focus:outline-hidden focus:border-[#C65A86]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-[#C65A86] hover:bg-[#a9446d] text-white font-bold rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Enviar consulta vía WhatsApp</span>
            </button>

            {sentSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Se abrió WhatsApp con tu mensaje preparado para PURÉ FASHION.</span>
              </div>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};
