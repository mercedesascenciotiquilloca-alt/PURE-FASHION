import React from 'react';
import { Shield, Lock } from 'lucide-react';
import { STORE_OWNER, WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8DCE8] text-[#76518F] text-xs font-bold rounded-full mb-2">
          <Shield className="w-3.5 h-3.5" />
          <span>Políticas de la Tienda</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#29232A] font-display">
          Políticas de Privacidad
        </h1>
        <p className="text-xs text-[#29232A]/70 mt-1">
          Última actualización: Temporada 2026 · PURÉ FASHION
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900">
        <p className="font-bold mb-1">Nota para la administración:</p>
        <p>
          Este texto es un borrador configurable preparado para PURÉ FASHION (Propietaria: {STORE_OWNER}). Puede ser adaptado y revisado por la propietaria antes del lanzamiento comercial definitivo.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#F8DCE8] p-6 sm:p-10 text-xs sm:text-sm text-[#29232A]/85 leading-relaxed space-y-6 shadow-xs">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#29232A] flex items-center gap-2">
            <span>1. Responsable del Tratamiento</span>
          </h2>
          <p>
            El sitio web <strong>PURÉ FASHION</strong> es operado bajo la titularidad de <strong>{STORE_OWNER}</strong>, con domicilio comercial en Puno y Juliaca, Perú, y contacto directo a través de la línea de WhatsApp <strong>{WHATSAPP_DISPLAY}</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#29232A]">
            2. Información recopilada
          </h2>
          <p>
            Al utilizar nuestra tienda virtual o completar formularios de cotización y pedidos, únicamente solicitamos datos indispensables para el procesamiento y despacho de sus prendas:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs">
            <li>Nombres y apellidos del comprador.</li>
            <li>Número de teléfono celular / WhatsApp para coordinación del envío.</li>
            <li>Dirección de entrega, departamento, provincia y referencias de llegada.</li>
            <li>Prendas, tallas, colores y cantidades seleccionadas.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#29232A]">
            3. Finalidad del uso de datos
          </h2>
          <p>
            Los datos facilitados se destinan exclusivamente a:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs">
            <li>Preparar y verificar el pedido de prendas de vestir.</li>
            <li>Confirmar la disponibilidad física de inventario en almacén.</li>
            <li>Entregar las prendas en el domicilio coordinado o mediante agencia de transporte.</li>
            <li>Atender consultas y brindar asesoría en tallas mediante WhatsApp.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#29232A]">
            4. Seguridad y No Almacenamiento Financiero
          </h2>
          <p>
            PURÉ FASHION <strong>nunca</strong> almacena números confidenciales de tarjetas de crédito, claves secretas ni contraseñas bancarias en el navegador o en servidores públicos. Las confirmaciones de pago (Yape, Plin o depósitos) se gestionan mediante comprobante directo entre el cliente y la titular.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-[#29232A]">
            5. Canales de Consulta
          </h2>
          <p>
            Cualquier duda respecto al manejo de su información puede ser remitida directamente a nuestro canal de WhatsApp: <strong>{WHATSAPP_DISPLAY}</strong>.
          </p>
        </section>
      </div>

    </div>
  );
};
