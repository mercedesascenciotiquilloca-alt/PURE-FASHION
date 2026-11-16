import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FFF9F5] rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#F8DCE8] relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#29232A]/70 hover:text-[#C65A86] rounded-full hover:bg-[#F8DCE8]/50 transition-colors"
          aria-label="Cerrar guía de tallas"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-[#F8DCE8] text-[#C65A86] rounded-xl">
            <Ruler className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#29232A]">Guía de Tallas PURÉ FASHION</h3>
            <p className="text-xs text-[#29232A]/70">Medidas corporales de referencia en centímetros (cm)</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-[#29232A]">
          <div>
            <h4 className="font-semibold text-[#76518F] mb-2">Tallas de Blusas, Polos y Vestidos</h4>
            <div className="overflow-x-auto rounded-xl border border-[#F8DCE8] bg-white">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FFF9F5] border-b border-[#F8DCE8] text-[#76518F] font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Talla</th>
                    <th className="py-2.5 px-3">Busto (cm)</th>
                    <th className="py-2.5 px-3">Cintura (cm)</th>
                    <th className="py-2.5 px-3">Cadera (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8DCE8]/60 font-mono text-xs">
                  <tr>
                    <td className="py-2 px-3 font-bold font-sans">XS</td>
                    <td className="py-2 px-3">80 - 84</td>
                    <td className="py-2 px-3">60 - 64</td>
                    <td className="py-2 px-3">86 - 90</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold font-sans">S</td>
                    <td className="py-2 px-3">85 - 89</td>
                    <td className="py-2 px-3">65 - 69</td>
                    <td className="py-2 px-3">91 - 95</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold font-sans">M</td>
                    <td className="py-2 px-3">90 - 95</td>
                    <td className="py-2 px-3">70 - 75</td>
                    <td className="py-2 px-3">96 - 101</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold font-sans">L</td>
                    <td className="py-2 px-3">96 - 102</td>
                    <td className="py-2 px-3">76 - 82</td>
                    <td className="py-2 px-3">102 - 108</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold font-sans">XL</td>
                    <td className="py-2 px-3">103 - 110</td>
                    <td className="py-2 px-3">83 - 90</td>
                    <td className="py-2 px-3">109 - 116</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#76518F] mb-2">Tallas de Pantalones y Jeans</h4>
            <div className="overflow-x-auto rounded-xl border border-[#F8DCE8] bg-white">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FFF9F5] border-b border-[#F8DCE8] text-[#76518F] font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Talla Denim</th>
                    <th className="py-2.5 px-3">Equivalencia</th>
                    <th className="py-2.5 px-3">Cintura (cm)</th>
                    <th className="py-2.5 px-3">Cadera (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8DCE8]/60 font-mono text-xs">
                  <tr>
                    <td className="py-2 px-3 font-bold font-sans">26</td>
                    <td className="py-2 px-3 font-sans">XS / 34</td>
                    <td className="py-2 px-3">62 - 66</td>
                    <td className="py-2 px-3">88 - 92</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold font-sans">28</td>
                    <td className="py-2 px-3 font-sans">S / 36</td>
                    <td className="py-2 px-3">67 - 71</td>
                    <td className="py-2 px-3">93 - 97</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold font-sans">30</td>
                    <td className="py-2 px-3 font-sans">M / 38</td>
                    <td className="py-2 px-3">72 - 76</td>
                    <td className="py-2 px-3">98 - 103</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold font-sans">32</td>
                    <td className="py-2 px-3 font-sans">L / 40</td>
                    <td className="py-2 px-3">77 - 82</td>
                    <td className="py-2 px-3">104 - 110</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 bg-[#F8DCE8]/40 rounded-xl text-xs text-[#29232A]/80 border border-[#F8DCE8]">
            <p className="font-semibold text-[#C65A86] mb-1">¿Tienes dudas entre dos tallas?</p>
            <p>
              Escríbenos directamente a nuestro WhatsApp oficial al <strong>+51 949 173 777</strong> y te orientaremos con las medidas exactas de cada prenda antes de despacharla.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#C65A86] hover:bg-[#a9446d] text-white font-medium rounded-xl text-sm transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
