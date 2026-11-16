import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Truck,
  ArrowRight,
  Info,
  QrCode,
  Smartphone,
  CreditCard,
  Building,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { buildWhatsAppLink, WHATSAPP_DISPLAY } from '../utils/whatsapp';
import { saveOrderToSupabase } from '../utils/supabase';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [department, setDepartment] = useState('Puno');
  const [province, setProvince] = useState('San Román (Juliaca)');
  const [district, setDistrict] = useState('Juliaca');
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'domicilio' | 'tienda'>('domicilio');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'plin' | 'transferencia' | 'contraentrega' | 'tarjeta'>('yape');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [completedOrderId, setCompletedOrderId] = useState<string>('');

  const shippingCost = deliveryMethod === 'tienda' ? 0 : 10.00;
  const total = subtotal + shippingCost;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = 'Ingresa tus nombres.';
    if (!lastName.trim()) errs.lastName = 'Ingresa tus apellidos.';
    if (!phone.trim()) {
      errs.phone = 'Ingresa tu número de teléfono.';
    } else if (!/^[0-9+ ]{8,15}$/.test(phone.trim())) {
      errs.phone = 'Ingresa un número telefónico válido (ej. 949 173 777).';
    }
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Ingresa un correo electrónico válido.';
    }

    if (deliveryMethod === 'domicilio') {
      if (!address.trim()) errs.address = 'Ingresa tu dirección de entrega.';
      if (!district.trim()) errs.district = 'Ingresa el distrito.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    const orderId = `PF-${Date.now().toString().slice(-6)}`;
    setCompletedOrderId(orderId);
    setOrderComplete(true);

    // Save order in Supabase database
    saveOrderToSupabase({
      orderId,
      customer: {
        firstName,
        lastName,
        phone,
        email,
      },
      delivery: {
        department,
        province,
        district,
        address,
        reference,
        deliveryMethod,
        preferredDate,
        notes,
      },
      paymentMethod,
      items: cart,
      subtotal,
      shippingCost,
      total,
      createdAt: new Date().toISOString(),
      status: 'En proceso',
    }).then((res) => {
      if (res.success) {
        console.log('Pedido guardado exitosamente en Supabase:', orderId);
      }
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    // Clear cart in background after successful simulation
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  // Build WhatsApp confirmation message from checkout details
  const getWhatsAppOrderConfirmationLink = () => {
    const itemsList = cart
      .map(
        (i) =>
          `- ${i.product.name} (Talla: ${i.selectedSize}, Color: ${i.selectedColor}) x${i.quantity} = ${formatPrice(
            i.product.price * i.quantity
          )}`
      )
      .join('\n');

    const msg = `Hola PURÉ FASHION, acabo de registrar un pedido en su tienda virtual:

*Orden:* ${completedOrderId}
*Cliente:* ${firstName} ${lastName}
*Teléfono:* ${phone}
*Modalidad:* ${deliveryMethod === 'tienda' ? 'Recojo en tienda' : 'Envío a domicilio'}
*Ubicación:* ${district}, ${province}, ${department} ${address ? `(${address})` : ''}
*Método de pago elegido:* ${paymentMethod.toUpperCase()}

*Prendas:*
${itemsList}

*Total:* ${formatPrice(total)}

¿Podrían confirmarme la recepción del pedido y los pasos para coordinar la entrega? Muchas gracias.`;

    return buildWhatsAppLink(msg);
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-[#29232A] mb-2">No tienes prendas en tu bolsa</h2>
        <p className="text-xs text-[#29232A]/70 mb-6">
          Añade tus prendas preferidas para completar el checkout.
        </p>
        <Link
          to="/tienda"
          className="px-6 py-2.5 bg-[#C65A86] text-white text-xs font-semibold rounded-xl"
        >
          Ir a la Tienda
        </Link>
      </div>
    );
  }

  // ORDER SUCCESS STATE
  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white rounded-3xl border border-[#F8DCE8] p-6 sm:p-10 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              ¡Pedido Registrado con Éxito!
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#29232A] font-display mt-1">
              Gracias, {firstName}
            </h1>
            <p className="text-xs sm:text-sm text-[#29232A]/80 mt-2 max-w-lg mx-auto">
              Hemos registrado los datos de tu orden con el código{' '}
              <strong className="text-[#C65A86] font-mono text-base">{completedOrderId}</strong>.
            </p>
          </div>

          <div className="p-4 bg-[#FFF9F5] rounded-2xl border border-[#F8DCE8] text-xs text-left space-y-2">
            <div className="flex justify-between pb-2 border-b border-[#F8DCE8]/60">
              <span className="text-slate-500">Total a abonar:</span>
              <span className="font-bold font-mono text-sm text-[#C65A86]">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Método de pago:</span>
              <span className="font-semibold capitalize text-[#29232A]">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Entrega:</span>
              <span className="font-semibold text-[#29232A]">
                {deliveryMethod === 'tienda' ? 'Recojo en tienda (Juliaca / Puno)' : `Envío a ${district}, ${department}`}
              </span>
            </div>
          </div>

          {/* Pending backend disclaimer */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs text-left flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-[11px] uppercase tracking-wide">
                Pendiente de conexión al backend
              </p>
              <p className="text-[11px] text-amber-800">
                Esta es una demostración comercial. Para confirmar el pago y coordinar el envío de inmediato, pulsa el botón de WhatsApp a continuación.
              </p>
            </div>
          </div>

          {/* WhatsApp Direct Confirmation Button */}
          <div className="space-y-3">
            <a
              href={getWhatsAppOrderConfirmationLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Enviar detalles de este pedido por WhatsApp</span>
            </a>

            <Link
              to="/tienda"
              className="inline-block text-xs text-[#76518F] font-semibold hover:underline"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C65A86]">
          Finalizar Compra
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#29232A] font-display mt-0.5">
          Checkout de Demostración
        </h1>
        <p className="text-xs sm:text-sm text-[#29232A]/70 mt-1">
          Completa tus datos de contacto y entrega para registrar tu orden en PURÉ FASHION.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Customer & Delivery Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Customer Data */}
          <div className="bg-white rounded-3xl border border-[#F8DCE8] p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-extrabold text-[#29232A] border-b border-[#F8DCE8] pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F8DCE8] text-[#C65A86] text-xs font-bold flex items-center justify-center">1</span>
              <span>Datos del Cliente</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#29232A] mb-1">
                  Nombres *
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ej. María"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF9F5] border rounded-xl focus:outline-hidden focus:border-[#C65A86] ${
                    errors.firstName ? 'border-rose-400' : 'border-[#F8DCE8]'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-[10px] text-rose-500 mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#29232A] mb-1">
                  Apellidos *
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Ej. Mamani Quispe"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF9F5] border rounded-xl focus:outline-hidden focus:border-[#C65A86] ${
                    errors.lastName ? 'border-rose-400' : 'border-[#F8DCE8]'
                  }`}
                />
                {errors.lastName && (
                  <p className="text-[10px] text-rose-500 mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#29232A] mb-1">
                  Número de WhatsApp / Teléfono *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. 949 173 777"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF9F5] border rounded-xl focus:outline-hidden focus:border-[#C65A86] ${
                    errors.phone ? 'border-rose-400' : 'border-[#F8DCE8]'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#29232A] mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF9F5] border rounded-xl focus:outline-hidden focus:border-[#C65A86] ${
                    errors.email ? 'border-rose-400' : 'border-[#F8DCE8]'
                  }`}
                />
                {errors.email && (
                  <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Details */}
          <div className="bg-white rounded-3xl border border-[#F8DCE8] p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-extrabold text-[#29232A] border-b border-[#F8DCE8] pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F8DCE8] text-[#C65A86] text-xs font-bold flex items-center justify-center">2</span>
              <span>Método y Lugar de Entrega</span>
            </h2>

            {/* Delivery Method Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 transition-colors ${
                  deliveryMethod === 'domicilio'
                    ? 'border-[#C65A86] bg-[#F8DCE8]/30'
                    : 'border-[#F8DCE8] bg-[#FFF9F5]'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'domicilio'}
                  onChange={() => setDeliveryMethod('domicilio')}
                  className="text-[#C65A86]"
                />
                <div>
                  <p className="text-xs font-bold text-[#29232A]">Envío a domicilio</p>
                  <p className="text-[11px] text-[#29232A]/70">Puno, Juliaca o provincia (S/ 10.00)</p>
                </div>
              </label>

              <label
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 transition-colors ${
                  deliveryMethod === 'tienda'
                    ? 'border-[#C65A86] bg-[#F8DCE8]/30'
                    : 'border-[#F8DCE8] bg-[#FFF9F5]'
                }`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  checked={deliveryMethod === 'tienda'}
                  onChange={() => setDeliveryMethod('tienda')}
                  className="text-[#C65A86]"
                />
                <div>
                  <p className="text-xs font-bold text-[#29232A]">Recojo en tienda</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">Gratis en Juliaca / Puno</p>
                </div>
              </label>
            </div>

            {deliveryMethod === 'domicilio' ? (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#29232A] mb-1">
                      Departamento
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl text-[#29232A]"
                    >
                      <option value="Puno">Puno</option>
                      <option value="Arequipa">Arequipa</option>
                      <option value="Cusco">Cusco</option>
                      <option value="Lima">Lima</option>
                      <option value="Moquegua">Moquegua</option>
                      <option value="Tacna">Tacna</option>
                      <option value="Otro">Otro departamento</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#29232A] mb-1">
                      Provincia
                    </label>
                    <input
                      type="text"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      placeholder="Ej. San Román"
                      className="w-full px-3 py-2 text-xs bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl text-[#29232A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#29232A] mb-1">
                      Distrito *
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="Ej. Juliaca"
                      className={`w-full px-3 py-2 text-xs bg-[#FFF9F5] border rounded-xl text-[#29232A] ${
                        errors.district ? 'border-rose-400' : 'border-[#F8DCE8]'
                      }`}
                    />
                    {errors.district && (
                      <p className="text-[10px] text-rose-500 mt-1">{errors.district}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#29232A] mb-1">
                    Dirección exacta (Calle, Jirón, Número) *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej. Jr. San Román 345, Dpto 2"
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#FFF9F5] border rounded-xl ${
                      errors.address ? 'border-rose-400' : 'border-[#F8DCE8]'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[10px] text-rose-500 mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#29232A] mb-1">
                    Referencia de entrega
                  </label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Ej. Frente al parque, puerta blanca"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#F8DCE8]/30 rounded-2xl border border-[#F8DCE8] text-xs space-y-1">
                <p className="font-bold text-[#76518F]">Punto de recojo comercial:</p>
                <p className="text-[#29232A]">PURÉ FASHION · Juliaca / Puno, Perú</p>
                <p className="text-slate-500 text-[11px]">
                  Coordinaremos la hora exacta de recojo directamente mediante WhatsApp al confirmar tu pedido.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#29232A] mb-1">
                  Fecha preferida de entrega (opcional)
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl text-[#29232A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#29232A] mb-1">
                  Observaciones adicionales
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Llamar antes de entregar"
                  className="w-full px-3.5 py-2 text-xs bg-[#FFF9F5] border border-[#F8DCE8] rounded-xl text-[#29232A]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method Options */}
          <div className="bg-white rounded-3xl border border-[#F8DCE8] p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-extrabold text-[#29232A] border-b border-[#F8DCE8] pb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F8DCE8] text-[#C65A86] text-xs font-bold flex items-center justify-center">3</span>
              <span>Método de Pago</span>
            </h2>

            <div className="space-y-2.5">
              {[
                { id: 'yape', name: 'Yape', desc: 'Pago rápido mediante código QR o número de celular', icon: Smartphone },
                { id: 'plin', name: 'Plin', desc: 'Transferencia interbancaria inmediata con Plin', icon: Smartphone },
                { id: 'transferencia', name: 'Transferencia Bancaria (BCP / BBVA / Interbank)', desc: 'Envío de constancia de depósito bancario', icon: Building },
                { id: 'contraentrega', name: 'Pago contra entrega (Juliaca / Puno)', desc: 'Abona en efectivo al momento de recibir la prenda', icon: DollarSign },
                { id: 'tarjeta', name: 'Tarjeta Débito / Crédito (Simulada)', desc: 'Pasarela de prueba para demostración comercial', icon: CreditCard }
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <label
                    key={m.id}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-3 transition-colors ${
                      isSelected
                        ? 'border-[#C65A86] bg-[#F8DCE8]/30'
                        : 'border-[#F8DCE8] bg-[#FFF9F5] hover:bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={isSelected}
                      onChange={() => setPaymentMethod(m.id as any)}
                      className="text-[#C65A86] mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#76518F]" />
                        <span className="text-xs font-bold text-[#29232A]">{m.name}</span>
                      </div>
                      <p className="text-[11px] text-[#29232A]/70 mt-0.5">{m.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Security Notice */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#76518F] shrink-0 mt-0.5" />
              <span>
                <strong>Aviso de Privacidad y Seguridad:</strong> No solicitamos contraseñas bancarias, claves de Yape/Plin ni CVV. La transacción se valida con la propietaria (Mercedes Ascencio Tiquilloca) de forma segura.
              </span>
            </div>
          </div>

        </div>

        {/* Right Order Summary & Submit (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#F8DCE8] p-6 space-y-6 shadow-xs sticky top-24">
          <h2 className="text-base font-extrabold text-[#29232A] border-b border-[#F8DCE8] pb-3">
            Resumen de Compra ({cart.length} ítems)
          </h2>

          {/* Mini item list */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex items-center gap-3 text-xs">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-14 object-cover rounded-lg bg-[#FFF9F5] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#29232A] truncate">{item.product.name}</p>
                  <p className="text-[10px] text-slate-500">
                    Talla {item.selectedSize} · {item.selectedColor} · Cant: {item.quantity}
                  </p>
                </div>
                <span className="font-mono font-bold text-[#29232A]">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-[#29232A] border-t border-[#F8DCE8] pt-4">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal prendas:</span>
              <span className="font-bold font-mono">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Costo de entrega:</span>
              <span className="font-bold font-mono">
                {deliveryMethod === 'tienda' ? 'Gratis' : formatPrice(shippingCost)}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-[#29232A] pt-3 border-t border-[#F8DCE8]">
              <span>Total a pagar:</span>
              <span className="text-[#C65A86] font-mono">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Submit Order Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-[#C65A86] hover:bg-[#a9446d] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 text-sm flex items-center justify-center gap-2"
          >
            <span>Confirmar Pedido de Demostración</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            Al hacer clic, se generará tu comprobante simulado y podrás enviar el resumen detallado por WhatsApp al <strong>{WHATSAPP_DISPLAY}</strong>.
          </p>

        </div>

      </form>
    </div>
  );
};
