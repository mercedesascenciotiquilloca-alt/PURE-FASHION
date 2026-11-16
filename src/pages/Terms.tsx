import React from 'react';
import { FileText } from 'lucide-react';
import { STORE_OWNER, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8DCE8] text-[#76518F] text-xs font-bold rounded-full mb-2">
          <FileText className="w-3.5 h-3.5" />
          <span>Condiciones de Servicio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#29232A] font-display">
          Términos y Condiciones
        </h1>
        <p className="text-xs text-[#29232A]/70 mt-1">
          Borrador comercial editable para PURÉ FASHION · Propietaria: {STORE_OWNER}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#F8DCE8] p-6 sm:p-10 text-xs sm:text-sm text-[#29232A]/85 leading-relaxed space-y-6 shadow-xs">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#29232A]">
            1. Ámbito de Aplicación
          </h2>
          <p>
            Los presentes Términos y Condiciones regulan la exploración, consulta y solicitud de pedidos de prendas de vestir ofrecidas en la tienda online <strong>PURÉ FASHION</strong>, dirigida por <strong>{STORE_OWNER}</strong> en la región de Puno, Perú.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#29232A]">
            2. Naturaleza de los Productos
          </h2>
          <p>
            PURÉ FASHION comercializa exclusivamente <strong>prendas de vestir y complementos de moda</strong> (polos, blusas, pantalones, jeans, vestidos, faldas, casacas, conjuntos, ropa deportiva y accesorios). No vendemos regalos ajenos a la indumentaria. Las fotografías procuran reflejar con la mayor exactitud posible los colores, cortes y texturas de cada tela.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#29232A]">
            3. Precios y Moneda
          </h2>
          <p>
            Todos los precios mostrados en el catálogo web están fijados en <strong>Soles peruanos (S/)</strong>. Las promociones y descuentos temporales son transparentes y válidos según la disponibilidad de stock declarada.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#29232A]">
            4. Proceso de Pedidos y Validación
          </h2>
          <p>
            La generación de pedidos por WhatsApp o a través del formulario de demostración constituye una solicitud de reserva. La confirmación final se concreta una vez verificado el inventario físico y acordada la modalidad de pago y entrega con la titular al número <strong>{WHATSAPP_DISPLAY}</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#29232A]">
            5. Envíos y Entregas
          </h2>
          <p>
            Las entregas se coordinan para Juliaca, Puno ciudad y provincias aledañas, así como a nivel nacional vía agencias de transporte terrestre. Los plazos y costos de flete son comunicados claramente al cliente antes de efectuar el despacho.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#29232A]">
            6. Cambios y Garantía
          </h2>
          <p>
            Si una prenda no calza en la talla esperada, el cliente podrá solicitar un cambio de talla dentro de un plazo de hasta 7 días hábiles, manteniendo la prenda en estado intacto, sin signos de uso y con sus etiquetas.
          </p>
        </section>
      </div>

    </div>
  );
};
