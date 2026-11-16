# PURÉ FASHION · Tienda Virtual de Ropa y Moda

Tienda online moderna, elegante, rápida y totalmente responsive desarrollada para **PURÉ FASHION**, con identidad visual exclusiva, catálogo de prendas de vestir, selección de tallas y colores, persistencia local, pedidos automáticos por WhatsApp y checkout de demostración.

- **Nombre Comercial:** PURÉ FASHION
- **Propietaria:** Mercedes Ascencio Tiquilloca
- **Ubicación Comercial:** Puno / Juliaca, Puno, Perú
- **WhatsApp Oficial de Pedidos:** [+51 949 173 777](https://wa.me/51949173777)
- **Moneda:** Soles peruanos (S/)
- **Idioma:** Español

---

## 1. Estructura Completa del Proyecto

```text
├── index.html                  # Plantilla HTML5, fuentes Google, SEO y Schema.org ClothingStore
├── metadata.json               # Configuración de metadatos de la aplicación
├── package.json                # Dependencias, scripts y configuración de Vite + React
├── tsconfig.json               # Configuración TypeScript
├── vite.config.ts              # Configuración de compilación Vite y alias de rutas
├── src/
│   ├── main.tsx                # Punto de entrada de renderizado React
│   ├── index.css               # Importación de Tailwind CSS, paleta de colores oficial y tipografías
│   ├── App.tsx                 # Enrutador principal (React Router) con 14 páginas y proveedores de contexto
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript: Product, Category, CartItem, OrderRecord
│   ├── data/
│   │   ├── categories.ts       # 10 Categorías oficiales con imágenes y descripciones
│   │   └── products.ts         # Catálogo de 26 prendas auténticas con tallas, colores, stock y precios
│   ├── context/
│   │   ├── CartContext.tsx     # Contexto global del carrito (localStorage, cálculo de totales, toast)
│   │   └── FavoritesContext.tsx # Contexto global de favoritos (localStorage, contador y toggle)
│   ├── utils/
│   │   ├── formatPrice.ts      # Utilidad para formatear importes en Soles (S/) y cálculo de descuentos
│   │   ├── storage.ts          # Manejador seguro de localStorage con tolerancia a iframes privados
│   │   └── whatsapp.ts         # Generador de enlaces https://wa.me/51949173777 con mensajes codificados
│   ├── components/
│   │   ├── Header.tsx          # Barra superior, logo, buscador, accesos y menú responsive
│   │   ├── Footer.tsx          # Enlaces de tienda, políticas, newsletter, valores de marca y copyright
│   │   ├── ProductCard.tsx     # Tarjeta de producto con foto, selector rápido de talla, precios y botones
│   │   ├── ProductGrid.tsx     # Cuadrícula responsive con estado vacío adaptativo
│   │   ├── CategoryCard.tsx    # Tarjeta de categoría con fotografía y botón "Ver prendas"
│   │   ├── CartDrawer.tsx      # Carrito lateral deslizable con pedido instantáneo por WhatsApp
│   │   ├── NotificationToast.tsx # Notificación emergente al agregar prendas al carrito
│   │   ├── SizeGuideModal.tsx  # Modal interactivo con tabla de medidas corporales en centímetros
│   │   └── WhatsAppButton.tsx  # Botón flotante directo para pedidos y consultas
│   └── pages/
│       ├── Home.tsx            # Portada: Hero, Categorías, Favoritos de temporada, Valores, Testimonios
│       ├── Shop.tsx            # Catálogo completo con buscador en tiempo real, filtros y ordenamiento
│       ├── ProductDetail.tsx   # Ficha de producto con galería, validación de talla/color y WhatsApp
│       ├── Cart.tsx            # Página de carrito con desglose, selector de envío y pedido
│       ├── Checkout.tsx        # Formulario de checkout simulado con validación y emisión de pedido
│       ├── About.tsx           # Página "Nosotros" con manifiesto de marca y titular Mercedes Ascencio
│       ├── Collections.tsx     # Sección "Lo nuevo de PURÉ FASHION" con novedades
│       ├── Offers.tsx          # Sección "Ofertas" con prendas con descuentos reales
│       ├── Favorites.tsx       # Página de prendas favoritas guardadas por el usuario
│       ├── Contact.tsx         # Datos comerciales, formulario y enlace WhatsApp directo
│       ├── FAQ.tsx             # Preguntas frecuentes sobre envíos, medios de pago y cambios
│       ├── Privacy.tsx         # Políticas de privacidad editables para la titular
│       ├── Terms.tsx           # Términos y condiciones del servicio comercial
│       └── CategoriesPage.tsx  # Directorio visual de las 10 categorías de moda
```

---

## 2. Paleta de Colores Oficial

- **Rosa suave:** `#F8DCE8`
- **Rosa oscuro:** `#C65A86`
- **Blanco:** `#FFFFFF`
- **Morado elegante:** `#76518F`
- **Crema claro:** `#FFF9F5`
- **Texto oscuro:** `#29232A`

---

## 3. Guía de Instalación Paso a Paso

### Requisitos previos
- Node.js versión 18 o superior.
- Gestor de paquetes `npm` (incluido con Node.js).

### Pasos:
1. **Abrir la terminal en la carpeta del proyecto**:
   ```bash
   cd pure-fashion
   ```
2. **Instalar dependencias**:
   ```bash
   npm install
   ```
3. **Iniciar el servidor de desarrollo local**:
   ```bash
   npm run dev
   ```
4. **Abrir en el navegador**:
   Visita `http://localhost:3000` para interactuar con la tienda.

5. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 4. Guía de Personalización

| Elemento | Archivo a modificar | Qué cambiar |
| :--- | :--- | :--- |
| **Número de WhatsApp** | `src/utils/whatsapp.ts` | Modificar `WHATSAPP_PHONE` ('51949173777') y `WHATSAPP_DISPLAY`. |
| **Propietaria & Ubicación**| `src/utils/whatsapp.ts` y `src/pages/About.tsx` | Variables `STORE_OWNER` y textos descriptivos. |
| **Prendas y Precios** | `src/data/products.ts` | Añadir, editar o remover prendas, tallas, colores, stock y fotografías. |
| **Categorías** | `src/data/categories.ts` | Modificar nombres de categorías, descripciones y fotos de portada. |
| **Colores y Estilos** | `src/index.css` | Cambiar los valores hexadecimales en las variables `--color-pure-*`. |
| **Políticas y Términos**| `src/pages/Privacy.tsx` y `Terms.tsx` | Ajustar las cláusulas legales y condiciones de despacho. |

---

## 5. Pedidos por WhatsApp (`https://wa.me/51949173777`)

El sistema construye mensajes dinámicos codificados con `encodeURIComponent` conteniendo:
- Lista de prendas seleccionadas.
- Talla y color elegidos para cada ítem.
- Cantidades y precios unitarios en Soles (S/).
- Subtotal y modalidad de envío elegida.
- Nombre del cliente (si fue provisto).

---

## 6. Conexión a Base de Datos Supabase

La tienda está conectada directamente con tu proyecto de **Supabase**:
- **Project ID:** `uqwspxezlxfxgflmoazr`
- **URL del proyecto:** `https://uqwspxezlxfxgflmoazr.supabase.co`
- **API Key Pública (Publishable):** `sb_publishable_QjpQZWp_KK0uODwiAvfJMA_1dxi7VzM`

### Tablas configuradas:
1. `products`: Guarda todas las prendas, precios, descuentos, tallas, colores, stock, descripciones y fotos.
2. `categories`: Guarda las 10 categorías de moda oficiales.
3. `orders`: Registra los pedidos completados en el checkout con datos del cliente y lista de prendas.
4. `inquiries`: Guarda las consultas de contacto directo y WhatsApp enviadas por clientes.
5. `newsletter`: Almacena correos suscritos para campañas de moda.

### Botón de Sincronización en la Tienda:
En la barra superior del encabezado verás el botón **"Supabase Conectado" / "Supabase Configurado"**. Al pulsar este botón se abre un panel interactivo con:
- Verificación de estado de conexión con tu proyecto.
- Botón **"Guardar y Sincronizar Tienda en Supabase Ahora"** para insertar todas las 26 prendas y categorías con un solo clic.
- Botón para copiar el script SQL de creación de tablas por si necesitas ejecutarlo en el **SQL Editor** de Supabase (`https://supabase.com/dashboard/project/uqwspxezlxfxgflmoazr/editor`).
