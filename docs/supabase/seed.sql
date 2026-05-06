-- ============================================================
-- SEED — Pizzería Demo
-- ============================================================
-- INSTRUCCIONES:
-- 1. Ve a Supabase → Authentication → Users
-- 2. Copia el UUID de tu usuario registrado
-- 3. Reemplaza TU_USER_UUID en la línea de abajo (solo esa línea)
-- 4. Ejecuta todo el bloque en Supabase → SQL Editor → Run
-- ============================================================

DO $$
DECLARE
  v_user_id    uuid := 'TU_USER_UUID';   -- ← reemplaza esto
  v_biz_id     uuid := gen_random_uuid();
  v_cat_pizza  uuid := gen_random_uuid();
  v_cat_bebida uuid := gen_random_uuid();
  v_cat_entre  uuid := gen_random_uuid();
  v_cat_postre uuid := gen_random_uuid();
BEGIN

  -- ── Business ──────────────────────────────────────────────
  INSERT INTO public.businesses (id, owner_id, name, slug, phone, address)
  VALUES (
    v_biz_id,
    v_user_id,
    'Pizzería Demo',
    'pizzeria-demo',
    '+34 600 000 000',
    'Calle Mayor 1, Madrid'
  );

  -- ── Profile ───────────────────────────────────────────────
  INSERT INTO public.profiles (id, business_id, role)
  VALUES (v_user_id, v_biz_id, 'owner');

  -- ── Categorías ────────────────────────────────────────────
  INSERT INTO public.categories (id, business_id, name) VALUES
    (v_cat_pizza,  v_biz_id, 'Pizzas'),
    (v_cat_bebida, v_biz_id, 'Bebidas'),
    (v_cat_entre,  v_biz_id, 'Entrantes'),
    (v_cat_postre, v_biz_id, 'Postres');

  -- ── Productos — Pizzas ────────────────────────────────────
  INSERT INTO public.products (business_id, category_id, name, description, price, available) VALUES
    (v_biz_id, v_cat_pizza, 'Margherita',
     'Tomate, mozzarella y albahaca fresca.',
     10.50, true),
    (v_biz_id, v_cat_pizza, 'Pepperoni',
     'Tomate, mozzarella y pepperoni artesanal.',
     12.90, true),
    (v_biz_id, v_cat_pizza, 'Cuatro Quesos',
     'Mozzarella, gorgonzola, parmesano y provolone.',
     13.50, true),
    (v_biz_id, v_cat_pizza, 'Vegana',
     'Tomate, pimientos, cebolla, champiñones y aceitunas.',
     12.00, true),
    (v_biz_id, v_cat_pizza, 'BBQ Pollo',
     'Salsa BBQ, pollo a la parrilla, cebolla y mozzarella.',
     13.90, true),
    (v_biz_id, v_cat_pizza, 'Trufa Negra',
     'Crema de trufa, mozzarella y rúcula. Temporada limitada.',
     16.50, false);

  -- ── Productos — Bebidas ───────────────────────────────────
  INSERT INTO public.products (business_id, category_id, name, description, price, available) VALUES
    (v_biz_id, v_cat_bebida, 'Agua 50 cl',    'Agua mineral natural.',        1.50, true),
    (v_biz_id, v_cat_bebida, 'Refresco',      'Cola, naranja o limón.',       2.50, true),
    (v_biz_id, v_cat_bebida, 'Cerveza 33 cl', 'Rubia de grifo en botella.',   2.90, true),
    (v_biz_id, v_cat_bebida, 'Vino tinto',    'Copa de vino tinto de la casa.',3.50, true);

  -- ── Productos — Entrantes ─────────────────────────────────
  INSERT INTO public.products (business_id, category_id, name, description, price, available) VALUES
    (v_biz_id, v_cat_entre, 'Pan de Ajo',
     'Pan artesano con mantequilla de ajo y perejil.',
     4.50, true),
    (v_biz_id, v_cat_entre, 'Ensalada César',
     'Lechuga romana, pollo, parmesano y aderezo César.',
     7.90, true),
    (v_biz_id, v_cat_entre, 'Nuggets x8',
     'Nuggets de pollo crujientes con salsa a elegir.',
     6.50, true);

  -- ── Productos — Postres ───────────────────────────────────
  INSERT INTO public.products (business_id, category_id, name, description, price, available) VALUES
    (v_biz_id, v_cat_postre, 'Tiramisú',
     'Clásico tiramisú italiano casero.',
     5.50, true),
    (v_biz_id, v_cat_postre, 'Brownie con helado',
     'Brownie caliente de chocolate con bola de vainilla.',
     5.90, true);

END $$;
