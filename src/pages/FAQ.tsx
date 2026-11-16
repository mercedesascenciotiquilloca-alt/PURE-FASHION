import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Ruler } from 'lucide-react';
import { WHATSAPP_DISPLAY, buildWhatsAppLink, generateWhatsAppGeneralContact } from '../utils/whatsapp';
import { SizeGuideModal } from '../components/SizeGuideModal';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const faqs = [
    {
      q: '¿Cómo realizo un pedido por WhatsApp en PURÉ FASHION?',
      a: 'Es muy fácil: agrega las prendas que te interesan al carrito seleccionando tu talla y color favorito, luego haz clic en "Comprar por WhatsApp". Se generará automáticamente un mensaje con la lista de tus prendas, el subtotal y el enlace directo al chat de WhatsApp oficial (+51 949 173 777), donde Mercedes Ascencio confirmará el stock y coordinará la entrega contigo.'
    },
    {
      q: '¿Hacen envíos en Puno, Juliaca y otras ciudades del Perú?',
      a: 'Sí. Realizamos entregas directas y recojo coordinado en Juliaca y Puno ciudad. Para otras provincias de la región y a nivel nacional, enviamos mediante empresas de transporte de confianza como Shalom, Olva Courier o Marvisur según tu preferencia.'
    },
    {
      q: '¿Cómo elijo mi talla correcta para evitar errores?',
      a: 'Cada prenda cuenta con una tabla de tallas detallada con medidas corporales en centímetros (busto, cintura y cadera). Además, antes de despachar cualquier prenda, puedes indicarnos tus medidas aproximadas por WhatsApp y verificaremos la prenda físicamente con cinta métrica.'
    },
    {
      q: '¿Cuáles son los métodos de pago aceptados?',
      a: 'Aceptamos transferencias y pagos móviles mediante Yape y Plin, transferencias bancarias directas (BCP, BBVA, Interbank o Banco de la Nación), y pago contra entrega en puntos coordinados en Juliaca o Puno.'
    },
    {
      q: '¿Se pueden realizar cambios de prenda o talla?',
      a: 'Sí, aceptamos cambios de talla dentro de los 7 días posteriores a la recepción de la prenda, siempre que la prenda se encuentre sin uso, con sus etiquetas intactas y en su empaque original. Coordinamos el cambio directamente por WhatsApp.'
    },
    {
      q: '¿Los precios mostrados en la tienda incluyen IGV?',
      a: 'Todos los precios en PURÉ FASHION están expresados en Soles peruanos (S/) de forma transparente y corresponden al valor final de cada prenda.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
          Centro de Ayuda
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#29232A] font-display">
          Preguntas Frecuentes (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-[#29232A]/70 max-w-xl mx-auto">
          Encuentra respuestas claras sobre pedidos, envíos, tallas y métodos de pago de PURÉ FASHION.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#F8DCE8] overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#29232A] hover:text-[#C65A86] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#76518F] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#29232A]/80 leading-relaxed border-t border-[#F8DCE8]/40 pt-3">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Helpful links box */}
      <div className="bg-[#FFF9F5] rounded-3xl border border-[#F8DCE8] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <p className="font-bold text-[#29232A]">¿Aún tienes dudas sobre una prenda o medida?</p>
          <p className="text-slate-600">Revisa la guía de medidas o escríbenos a nuestra línea oficial.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSizeGuideOpen(true)}
            className="px-4 py-2 bg-white border border-[#F8DCE8] hover:border-[#C65A86] text-[#76518F] font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Guía de Tallas</span>
          </button>

          <a
            href={buildWhatsAppLink(generateWhatsAppGeneralContact())}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#25D366] text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

    </div>
  );
};
