# TASKS.md

## Estado actual

Andres Project es ahora una app Next.js con App Router enfocada en un futuro SaaS para pizzerías locales: **Andres Project for Pizzerías**.

El proyecto mantiene una landing premium oscura, modularizada, y una primera vista visual de dashboard para pizzerías. No hay backend, login, base de datos ni integraciones reales todavía. Todo lo nuevo del dashboard usa datos mock.

## Trabajo realizado

### Landing

- Reenfoque de marca hacia **Andres Project for Pizzerías**.
- Hero orientado a pizzerías locales.
- Mensaje centrado en:
  - pedidos por WhatsApp
  - carta / landing inteligente
  - CRM básico de clientes
  - reservas
  - promociones
  - automatización IA
  - futuro panel SaaS
- CTA principal a WhatsApp con placeholder `00000000000`.
- Secciones de beneficios, funciones, planes, roadmap SaaS, casos de uso, proceso, confianza, testimonios placeholder, FAQ y CTA final.
- Metadata SEO básica actualizada en `app/layout.tsx`.

### Modularización

- Creada carpeta `components/landing`.
- Creada carpeta `data`.
- Secciones principales separadas en componentes:
  - `Hero`
  - `Benefits`
  - `Features`
  - `Pricing`
  - `CTA`
- Helpers visuales compartidos:
  - `Card`
  - `Section`
- Datos de landing movidos a `data/landing.ts`.

### Dashboard visual

- Creada ruta `/dashboard`.
- Creado dashboard visual para pizzerías con datos mock.
- Incluye:
  - pedidos de hoy
  - ventas del día
  - clientes
  - productos más vendidos
  - promociones
  - reseñas
  - automatizaciones WhatsApp
- Datos mock movidos a `data/dashboard.ts`.

## Estructura relevante

```text
app/
  dashboard/
    page.tsx
  globals.css
  layout.tsx
  page.tsx

components/
  landing/
    Benefits.tsx
    Card.tsx
    CTA.tsx
    Features.tsx
    Hero.tsx
    Pricing.tsx
    Section.tsx

data/
  dashboard.ts
  landing.ts
```

## Verificaciones realizadas

- `npm run lint`: correcto.
- `npm run build`: correcto.
- Rutas generadas:
  - `/`
  - `/dashboard`

Nota: Next muestra una advertencia preexistente porque detecta otro `package-lock.json` en `C:\Users\USUARIO\Desktop`. No bloquea el build.

## Próximos pasos recomendados

### Fase 2: convertir dashboard mock en estructura de producto

1. Crear carpeta `components/dashboard`.
2. Extraer componentes reutilizables desde `app/dashboard/page.tsx`:
   - `DashboardShell`
   - `DashboardPanel`
   - `StatCard`
   - `StatusBadge`
   - `DataTable`
   - `MetricCard`
3. Crear rutas mock nuevas:
   - `/dashboard/orders`
   - `/dashboard/customers`
   - `/dashboard/menu`
   - `/dashboard/promotions`
   - `/dashboard/whatsapp`
   - `/dashboard/reservations`
   - `/dashboard/reviews`
   - `/dashboard/settings`
4. Mantener todo con datos mock antes de añadir backend.

### Fase 3: definir modelos del MVP

Modelos iniciales propuestos:

- `Pizzeria`
- `Customer`
- `Product`
- `Category`
- `Order`
- `OrderItem`
- `Reservation`
- `Promotion`
- `Review`
- `WhatsappAutomation`

Primero pueden vivir como tipos TypeScript en `types/pizzeria.ts`; más adelante se pueden migrar a base de datos.

### Fase 4: flujo de onboarding mock

Crear `/onboarding` con pasos:

1. Datos de la pizzería.
2. Horarios y zonas de reparto.
3. Carta inicial.
4. Configuración de WhatsApp.
5. Primera automatización.
6. Ir al dashboard.

### Fase 5: backend real

No implementar todavía. Cuando el mock esté validado:

- elegir base de datos
- añadir autenticación
- persistir pizzerías, pedidos, clientes y productos
- añadir API routes
- preparar multi-tenant

### Fase 6: WhatsApp real

No integrar todavía. Primero validar:

- qué mensajes se automatizan
- qué datos se recogen
- qué estados de pedido necesita la pizzería
- qué permisos/API se usarán

## Qué implementar primero

El siguiente cambio más seguro es:

> Extraer componentes del dashboard actual y crear pantallas mock para pedidos, clientes, carta y WhatsApp.

Esto avanza hacia MVP real sin instalar dependencias, sin backend y sin romper la landing.

## Comandos útiles

```bash
npm run dev
```

Inicia el servidor de desarrollo.

```bash
npm run lint
```

Ejecuta ESLint.

```bash
npm run build
```

Compila producción y valida TypeScript/Next.

```bash
git status --short
```

Revisa archivos modificados.

## Restricciones actuales

- No hay autenticación.
- No hay backend.
- No hay base de datos.
- No hay pagos.
- No hay integración WhatsApp real.
- No se han instalado dependencias nuevas.
- El dashboard es solo visual con datos mock.
