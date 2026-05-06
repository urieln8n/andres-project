# Guía de prueba — MVP Andres Project for Pizzerías

## Requisitos previos

- Proyecto corriendo: `npm run dev` → `http://localhost:3000`
- Supabase configurado con `.env.local` (URL + ANON KEY)
- Schema SQL ejecutado en Supabase (ver `docs/supabase/schema.sql`)
- Políticas públicas ejecutadas (ver `docs/supabase/policies_public_menu.sql`)

---

## Mapa de rutas

| Ruta | Tipo | Descripción |
|---|---|---|
| `/` | Pública | Landing page |
| `/login` | Pública | Inicio de sesión |
| `/register` | Pública | Crear cuenta |
| `/menu` | Pública | Carta digital |
| `/dashboard` | Protegida | Panel principal |
| `/orders` | Protegida | Gestión de pedidos |
| `/customers` | Protegida | CRM de clientes |
| `/promotions` | Protegida | Promociones |
| `/settings` | Protegida | Ajustes |

---

## Flujo 1 — Registro y primer acceso

1. Ir a `http://localhost:3000`
2. Hacer clic en **Entrar** (cabecera, escritorio o móvil)
3. En `/login`, hacer clic en **Regístrate**
4. En `/register`, introducir email y contraseña (mín. 6 caracteres)
5. Hacer clic en **Crear cuenta**
6. Revisar el email — confirmar el enlace de verificación de Supabase
7. Volver a `/login`, introducir las credenciales y hacer clic en **Entrar**
8. Verificar redirección automática a `/dashboard`

**Resultado esperado:** Dashboard visible con datos mock o vacío si aún no hay datos reales.

---

## Flujo 2 — Protección de rutas

1. Cerrar sesión o abrir una ventana privada
2. Intentar acceder directamente a `http://localhost:3000/dashboard`
3. Verificar redirección automática a `/login`
4. Repetir con `/orders`, `/customers`, `/promotions`, `/settings`

**Resultado esperado:** Todas las rutas protegidas redirigen a `/login`.

---

## Flujo 3 — Crear negocio y productos en Supabase

> Antes de crear pedidos, el usuario autenticado necesita datos en la base de datos.

1. Ir al panel de Supabase → Table Editor
2. En la tabla **businesses**, insertar una fila:
   - `owner_id`: el UUID del usuario registrado (en Authentication → Users)
   - `name`: nombre de la pizzería
3. En la tabla **profiles**, insertar una fila:
   - `id`: el UUID del usuario
   - `business_id`: el UUID del negocio recién creado
   - `role`: `owner`
4. En la tabla **categories**, insertar categorías vinculadas al `business_id`
5. En la tabla **products**, insertar productos vinculados al `business_id` y `category_id`

---

## Flujo 4 — Menú digital (público)

1. Sin iniciar sesión, ir a `http://localhost:3000/menu`
2. Verificar que se muestran las categorías y productos reales
3. Comprobar que productos con `available = false` muestran "No disponible"
4. Verificar el skeleton de carga al refrescar

**Resultado esperado:** Productos reales de Supabase. Sin datos → mensaje "Sin categorías".

---

## Flujo 5 — Crear un pedido

1. Iniciar sesión y ir a `/orders`
2. Hacer clic en **+ Nuevo pedido**
3. Introducir nombre del cliente
4. Seleccionar productos con los botones `+` / `−`
5. Hacer clic en **Crear pedido**
6. Verificar que el pedido aparece en la lista con estado **Nuevo**

**Resultado esperado:** Pedido guardado en Supabase con sus `order_items`. El cliente se crea automáticamente si no existía.

---

## Flujo 6 — Cambiar estado de un pedido

1. En `/orders`, localizar un pedido existente
2. Hacer clic en uno de los botones de estado: **Preparando**, **Listo**, **Entregado**, **Cancelado**
3. Verificar que el badge de estado cambia tras la actualización

**Resultado esperado:** Estado actualizado en Supabase. La página se refresca con el nuevo estado.

---

## Flujo 7 — Clientes

1. Ir a `/customers`
2. Verificar que aparecen los clientes creados al generar pedidos
3. Comprobar las métricas: total pedidos, gasto total, último pedido, frecuente (3+ pedidos)
4. Usar el buscador para filtrar por nombre, teléfono o email

**Resultado esperado:** Lista de clientes reales con métricas calculadas desde Supabase.

---

## Flujo 8 — Navegación interna del dashboard

1. Desde cualquier página protegida, usar la barra de navegación superior
2. Verificar acceso a: **Overview**, **Pedidos**, **Clientes**, **Carta**, **Promos**, **Ajustes**
3. Hacer clic en **Cerrar sesión** (botón en el dashboard)
4. Verificar redirección a `/login`

**Resultado esperado:** Navegación completa sin errores 404.

---

## Checklist rápido

- [ ] Landing carga sin errores
- [ ] "Entrar" en cabecera lleva a `/login`
- [ ] Registro crea cuenta en Supabase
- [ ] Login redirige a `/dashboard`
- [ ] Rutas protegidas redirigen a `/login` sin sesión
- [ ] `/menu` muestra productos reales (requiere políticas públicas)
- [ ] Crear pedido guarda en `orders` + `order_items`
- [ ] Cambiar estado actualiza en Supabase
- [ ] `/customers` muestra clientes con métricas reales
- [ ] Buscador de clientes filtra correctamente
- [ ] Logout limpia sesión y redirige a `/login`

---

## Errores comunes

| Síntoma | Causa probable | Solución |
|---|---|---|
| Menú vacío | Políticas públicas no ejecutadas | Ejecutar `docs/supabase/policies_public_menu.sql` |
| Pedidos vacíos | Sin perfil/business en DB | Seguir Flujo 3 |
| "Error al cargar" en rojo | Variables `.env.local` incorrectas | Verificar URL y ANON KEY |
| No redirige a `/login` | Proxy no activo | Verificar que `proxy.ts` existe en la raíz |
| Email no llega | Límite de Supabase Auth gratuito | Confirmar dirección o usar otra |
