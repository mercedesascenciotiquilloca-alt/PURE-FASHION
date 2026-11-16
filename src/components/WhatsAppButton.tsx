import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink, generateWhatsAppGeneralContact } from '../utils/whatsapp';

export const WhatsAppButton: React.FC = () => {
  const url = buildWhatsAppLink(generateWhatsAppGeneralContact());

  return (
    <aside aria-label="Contacto por WhatsApp" className="fixed bottom-6 left-6 z-40">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 group"
        aria-label="Contactar a PURÉ FASHION por WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline whitespace-nowrap">
          Pedidos por WhatsApp
        </span>
      </a>
    </aside>
  );
};
