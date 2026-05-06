-- ============================================================
-- MVP Schema — Pizzería / Negocio Local
-- Ejecutar en: Supabase > SQL Editor > New Query
-- ============================================================

-- ──────────────────────────────────────────────────────────
-- FUNCIÓN: auto-actualizar updated_at
-- ──────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================
-- TABLA: businesses
-- ============================================================
CREATE TABLE public.businesses (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        text NOT NULL,
  slug        text UNIQUE,
  phone       text,
  address     text,
  logo_url    text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "businesses_owner_all"
  ON public.businesses
  FOR ALL
  USING (owner_id = auth.uid());

-- ============================================================
-- TABLA: profiles
-- Vincula auth.users con un business (multi-tenant)
-- ============================================================
CREATE TABLE public.profiles (
  id           uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id  uuid REFERENCES public.businesses(id) ON DELETE SET NULL,
  full_name    text,
  role         text NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'staff')),
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_profiles_business_id ON public.profiles(business_id);

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────────────────────
-- FUNCIÓN: obtener business_id del usuario actual (para RLS)
-- Definida aquí porque depende de public.profiles
-- SECURITY DEFINER evita recursión infinita en políticas
-- ──────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_user_business_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT business_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$;

-- El usuario puede ver y editar su propio perfil
CREATE POLICY "profiles_own_read"
  ON public.profiles
  FOR SELECT
  USING (id = auth.uid() OR business_id = get_user_business_id());

CREATE POLICY "profiles_own_update"
  ON public.profiles
  FOR UPDATE
  USING (id = auth.uid());

-- ============================================================
-- TABLA: categories
-- ============================================================
CREATE TABLE public.categories (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id  uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name         text NOT NULL,
  description  text,
  position     integer NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_categories_business_id ON public.categories(business_id);

CREATE TRIGGER trg_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_business_all"
  ON public.categories
  FOR ALL
  USING (business_id = get_user_business_id());

-- ============================================================
-- TABLA: products
-- ============================================================
CREATE TABLE public.products (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id  uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  category_id  uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  name         text NOT NULL,
  description  text,
  price        numeric(10, 2) NOT NULL CHECK (price >= 0),
  available    boolean NOT NULL DEFAULT true,
  image_url    text,
  position     integer NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_business_id  ON public.products(business_id);
CREATE INDEX idx_products_category_id  ON public.products(category_id);

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "products_business_all"
  ON public.products
  FOR ALL
  USING (business_id = get_user_business_id());

-- ============================================================
-- TABLA: customers
-- ============================================================
CREATE TABLE public.customers (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id  uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name         text NOT NULL,
  phone        text,
  email        text,
  address      text,
  notes        text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_customers_business_id ON public.customers(business_id);
CREATE INDEX idx_customers_phone       ON public.customers(business_id, phone);

CREATE TRIGGER trg_customers_updated_at
  BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "customers_business_all"
  ON public.customers
  FOR ALL
  USING (business_id = get_user_business_id());

-- ============================================================
-- TABLA: orders
-- ============================================================
CREATE TABLE public.orders (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id  uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  customer_id  uuid REFERENCES public.customers(id) ON DELETE SET NULL,
  status       text NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  total        numeric(10, 2) NOT NULL DEFAULT 0 CHECK (total >= 0),
  notes        text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_business_id  ON public.orders(business_id);
CREATE INDEX idx_orders_customer_id  ON public.orders(customer_id);
CREATE INDEX idx_orders_status       ON public.orders(business_id, status);

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "orders_business_all"
  ON public.orders
  FOR ALL
  USING (business_id = get_user_business_id());

-- ============================================================
-- TABLA: order_items
-- ============================================================
CREATE TABLE public.order_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id  uuid REFERENCES public.products(id) ON DELETE SET NULL,
  quantity    integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price  numeric(10, 2) NOT NULL CHECK (unit_price >= 0),
  subtotal    numeric(10, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  notes       text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_items_order_id   ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);

CREATE TRIGGER trg_order_items_updated_at
  BEFORE UPDATE ON public.order_items
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Acceso a través del business_id del pedido padre
CREATE POLICY "order_items_business_all"
  ON public.order_items
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
        AND orders.business_id = get_user_business_id()
    )
  );

-- ============================================================
-- TABLA: promotions
-- ============================================================
CREATE TABLE public.promotions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name            text NOT NULL,
  description     text,
  discount_type   text NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value  numeric(10, 2) NOT NULL CHECK (discount_value > 0),
  active          boolean NOT NULL DEFAULT true,
  starts_at       timestamptz,
  ends_at         timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_promotions_business_id ON public.promotions(business_id);

CREATE TRIGGER trg_promotions_updated_at
  BEFORE UPDATE ON public.promotions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "promotions_business_all"
  ON public.promotions
  FOR ALL
  USING (business_id = get_user_business_id());
