import { createClient } from '@supabase/supabase-js';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { Product, Category, OrderRecord } from '../types';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://uqwspxezlxfxgflmoazr.supabase.co';

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_QjpQZWp_KK0uODwiAvfJMA_1dxi7VzM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * SQL creation script provided for convenience if the tables are not yet created in Supabase SQL editor.
 */
export const SUPABASE_SCHEMA_SQL = `
-- Script SQL para crear las tablas de PURÉ FASHION en Supabase:

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  image TEXT,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  old_price NUMERIC(10,2),
  rating NUMERIC(3,2) DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT,
  materials TEXT,
  features TEXT[] DEFAULT '{}',
  sizes TEXT[] NOT NULL DEFAULT '{}',
  colors TEXT[] NOT NULL DEFAULT '{}',
  stock INTEGER DEFAULT 10,
  customizable BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  gender TEXT DEFAULT 'Mujer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  department TEXT NOT NULL,
  province TEXT NOT NULL,
  district TEXT NOT NULL,
  address TEXT,
  reference TEXT,
  delivery_method TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  preferred_date TEXT,
  notes TEXT,
  items JSONB NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  shipping_cost NUMERIC(10,2) NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'En proceso',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id BIGSERIAL PRIMARY KEY,
  customer_name TEXT,
  topic TEXT,
  message TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Políticas de lectura pública (RLS):
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURIDAD (RLS) - PROTECCIÓN DE DATOS PERSONALES:
DO $$ BEGIN
  -- 1. Categorías y Productos: Públicos para que los clientes vean el catálogo
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read categories') THEN
    CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read products') THEN
    CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
  END IF;

  -- 2. Pedidos (ORDERS): 
  -- Inserción permitida a clientes (para registrar pedidos desde la tienda)
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public create orders') THEN
    CREATE POLICY "Allow public create orders" ON orders FOR INSERT WITH CHECK (true);
  END IF;
  -- LECTURA PRIVADA: Bloqueado a visitantes anónimos. Solo el administrador autenticado puede ver datos personales
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin only read orders') THEN
    CREATE POLICY "Admin only read orders" ON orders FOR SELECT TO authenticated USING (true);
  END IF;

  -- 3. Consultas (INQUIRIES): 
  -- Clientes pueden enviar consultas, pero NADIE del público puede leer las consultas de otros
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public create inquiries') THEN
    CREATE POLICY "Allow public create inquiries" ON inquiries FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin only read inquiries') THEN
    CREATE POLICY "Admin only read inquiries" ON inquiries FOR SELECT TO authenticated USING (true);
  END IF;

  -- 4. Newsletter: 
  -- Clientes pueden suscribirse; la lista de correos es estrictamente privada para el administrador
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public subscribe newsletter') THEN
    CREATE POLICY "Allow public subscribe newsletter" ON newsletter FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin only read newsletter') THEN
    CREATE POLICY "Admin only read newsletter" ON newsletter FOR SELECT TO authenticated USING (true);
  END IF;
END $$;
`;

/**
 * Checks connection status to Supabase
 */
export async function testSupabaseConnection(): Promise<{ connected: boolean; message: string; details?: any }> {
  try {
    const { data, error } = await supabase.from('products').select('id').limit(1);
    if (error) {
      // If table does not exist error code (PGRST204 or 42P01)
      return {
        connected: false,
        message: error.message || 'Error al consultar Supabase',
        details: error,
      };
    }
    return {
      connected: true,
      message: 'Conectado exitosamente con Supabase',
      details: data,
    };
  } catch (err: any) {
    return {
      connected: false,
      message: err.message || 'Error de red o CORS al conectar con Supabase',
      details: err,
    };
  }
}

/**
 * Sync / Seed all store initial details (products & categories) into Supabase
 */
export async function syncStoreToSupabase(): Promise<{ success: boolean; message: string; syncedProducts?: number; syncedCategories?: number }> {
  try {
    // 1. Sync Categories
    const categoriesPayload = CATEGORIES.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      count: cat.count,
    }));

    const { error: catError } = await supabase
      .from('categories')
      .upsert(categoriesPayload, { onConflict: 'id' });

    if (catError) {
      throw new Error(`Error sincronizando categorías: ${catError.message}`);
    }

    // 2. Sync Products
    const productsPayload = PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: p.price,
      old_price: p.oldPrice || null,
      rating: p.rating,
      reviews: p.reviews,
      images: p.images,
      description: p.description,
      materials: p.materials || null,
      features: p.features || [],
      sizes: p.sizes,
      colors: p.colors,
      stock: p.stock,
      customizable: p.customizable,
      featured: p.featured,
      is_new: p.isNew || false,
      gender: p.gender,
    }));

    const { error: prodError } = await supabase
      .from('products')
      .upsert(productsPayload, { onConflict: 'id' });

    if (prodError) {
      throw new Error(`Error sincronizando prendas de vestir: ${prodError.message}`);
    }

    return {
      success: true,
      message: `¡Se guardaron exitosamente ${productsPayload.length} prendas y ${categoriesPayload.length} categorías en tu base de datos de Supabase!`,
      syncedProducts: productsPayload.length,
      syncedCategories: categoriesPayload.length,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'No se pudo completar la sincronización con Supabase',
    };
  }
}

/**
 * Fetch products from Supabase with fallback to local PRODUCTS array
 */
export async function fetchProductsFromSupabase(): Promise<{ products: Product[]; fromSupabase: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      return { products: PRODUCTS, fromSupabase: false, error: error?.message };
    }

    const mappedProducts: Product[] = data.map((item: any) => ({
      id: Number(item.id),
      name: item.name,
      slug: item.slug,
      category: item.category,
      price: Number(item.price),
      oldPrice: item.old_price ? Number(item.old_price) : undefined,
      rating: Number(item.rating) || 5.0,
      reviews: Number(item.reviews) || 0,
      images: Array.isArray(item.images) ? item.images : (item.images ? [item.images] : []),
      description: item.description || '',
      materials: item.materials || undefined,
      features: Array.isArray(item.features) ? item.features : [],
      sizes: Array.isArray(item.sizes) ? item.sizes : ['S', 'M', 'L'],
      colors: Array.isArray(item.colors) ? item.colors : ['Único'],
      stock: Number(item.stock) ?? 10,
      customizable: Boolean(item.customizable),
      featured: Boolean(item.featured),
      isNew: Boolean(item.is_new),
      gender: item.gender || 'Mujer',
    }));

    return { products: mappedProducts, fromSupabase: true };
  } catch (err: any) {
    return { products: PRODUCTS, fromSupabase: false, error: err.message };
  }
}

/**
 * Fetch categories from Supabase with fallback to local CATEGORIES array
 */
export async function fetchCategoriesFromSupabase(): Promise<{ categories: Category[]; fromSupabase: boolean; error?: string }> {
  try {
    const { data, error } = await supabase.from('categories').select('*').order('name', { ascending: true });

    if (error || !data || data.length === 0) {
      return { categories: CATEGORIES, fromSupabase: false, error: error?.message };
    }

    const mappedCategories: Category[] = data.map((item: any) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      description: item.description || '',
      image: item.image || '',
      count: Number(item.count) || 0,
    }));

    return { categories: mappedCategories, fromSupabase: true };
  } catch (err: any) {
    return { categories: CATEGORIES, fromSupabase: false, error: err.message };
  }
}

/**
 * Save an order to Supabase
 */
export async function saveOrderToSupabase(order: OrderRecord): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      id: order.orderId,
      customer_first_name: order.customer.firstName,
      customer_last_name: order.customer.lastName,
      customer_phone: order.customer.phone,
      customer_email: order.customer.email,
      department: order.delivery.department,
      province: order.delivery.province,
      district: order.delivery.district,
      address: order.delivery.address || null,
      reference: order.delivery.reference || null,
      delivery_method: order.delivery.deliveryMethod,
      payment_method: order.paymentMethod,
      preferred_date: order.delivery.preferredDate || null,
      notes: order.delivery.notes || null,
      items: order.items,
      subtotal: order.subtotal,
      shipping_cost: order.shippingCost,
      total: order.total,
      status: order.status,
      created_at: order.createdAt,
    };

    const { error } = await supabase.from('orders').insert([payload]);

    if (error) {
      console.warn('Error saving order to Supabase (table may not exist yet):', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('Supabase order insert error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Save customer inquiry to Supabase
 */
export async function saveInquiryToSupabase(inquiry: {
  customer_name?: string;
  topic?: string;
  message: string;
  phone?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('inquiries').insert([inquiry]);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Save newsletter subscriber to Supabase
 */
export async function saveNewsletterToSupabase(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('newsletter').insert([{ email }]);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
