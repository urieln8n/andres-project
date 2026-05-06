-- ============================================================
-- Políticas de lectura pública para el menú digital
-- Ejecutar en Supabase > SQL Editor si ya corriste schema.sql
-- ============================================================

-- Permite leer categorías sin autenticación (menú público)
CREATE POLICY "categories_public_read"
  ON public.categories
  FOR SELECT
  USING (true);

-- Permite leer productos sin autenticación (menú público)
CREATE POLICY "products_public_read"
  ON public.products
  FOR SELECT
  USING (true);
