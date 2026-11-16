export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  materials?: string;
  features?: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  customizable: boolean;
  featured: boolean;
  isNew?: boolean;
  gender: 'Mujer' | 'Hombre' | 'Unisex';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  count: number;
}

export interface CartItem {
  cartItemId: string; // unique hash of productId + size + color
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface CheckoutDelivery {
  department: string;
  province: string;
  district: string;
  address: string;
  reference: string;
  deliveryMethod: 'domicilio' | 'tienda';
  preferredDate?: string;
  notes?: string;
}

export interface OrderRecord {
  orderId: string;
  customer: CheckoutCustomer;
  delivery: CheckoutDelivery;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  createdAt: string;
  status: 'Completado (Simulación)' | 'En proceso';
}
