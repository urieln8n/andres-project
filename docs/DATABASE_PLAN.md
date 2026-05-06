# Database Plan

## Objetivo

Este documento define el modelo de datos inicial para **Andres Project for Pizzerías**, un SaaS para pizzerías locales que permitirá gestionar pedidos, clientes, carta, promociones, reseñas, automatizaciones WhatsApp y suscripciones.

No hay base de datos conectada todavía. Este plan sirve como guía para una futura implementación con PostgreSQL, Supabase, Prisma u otra solución similar.

## Principios

- El SaaS será multi-negocio: una misma plataforma podrá tener varias pizzerías.
- Cada negocio tendrá sus propios usuarios, productos, pedidos, clientes y configuraciones.
- Las tablas deben soportar primero un MVP simple.
- Se evita complejidad innecesaria hasta validar el producto.

## Relaciones principales

```text
businesses
  ├─ users
  ├─ categories
  │   └─ products
  ├─ customers
  │   ├─ orders
  │   ├─ reviews
  │   └─ whatsapp_messages
  ├─ promotions
  ├─ whatsapp_messages
  └─ subscriptions
```

## Tabla: businesses

Representa cada pizzería o negocio dentro del SaaS.

### Para qué sirve

Permite que el sistema sea multi-tenant. Todos los datos principales se vinculan a un `business_id`.

### Campos propuestos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | uuid | Identificador único del negocio. |
| `name` | text | Nombre comercial de la pizzería. |
| `slug` | text | Identificador legible para URLs o subdominios. |
| `phone` | text | Teléfono principal del local. |
| `whatsapp_number` | text | Número usado para WhatsApp automation. |
| `address` | text | Dirección física del local. |
| `city` | text | Ciudad. |
| `timezone` | text | Zona horaria del negocio. |
| `opening_hours` | jsonb | Horarios por día. |
| `delivery_zones` | jsonb | Zonas de reparto. |
| `minimum_order_amount` | decimal | Pedido mínimo para delivery. |
| `delivery_fee` | decimal | Coste de reparto por defecto. |
| `average_prep_time_minutes` | integer | Tiempo medio de preparación. |
| `status` | text | Estado: `active`, `paused`, `closed`. |
| `created_at` | timestamp | Fecha de creación. |
| `updated_at` | timestamp | Última actualización. |

### Relaciones

- Un `business` tiene muchos `users`.
- Un `business` tiene muchos `products`.
- Un `business` tiene muchos `orders`.
- Un `business` tiene muchos `customers`.
- Un `business` tiene muchas `promotions`.
- Un `business` tiene muchas `subscriptions`.

## Tabla: users

Representa usuarios internos que acceden al panel.

### Para qué sirve

Permite que dueños, encargados o empleados gestionen el dashboard de una pizzería.

### Campos propuestos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | uuid | Identificador único del usuario. |
| `business_id` | uuid | Negocio al que pertenece. |
| `name` | text | Nombre del usuario. |
| `email` | text | Email de acceso. |
| `role` | text | Rol: `owner`, `manager`, `staff`. |
| `status` | text | Estado: `active`, `invited`, `disabled`. |
| `last_login_at` | timestamp | Último acceso. |
| `created_at` | timestamp | Fecha de creación. |
| `updated_at` | timestamp | Última actualización. |

### Relaciones

- Cada `user` pertenece a un `business`.
- En una fase posterior se conectará con autenticación real.

## Tabla: categories

Representa categorías de la carta.

### Para qué sirve

Organiza productos como pizzas, bebidas, postres, entrantes o combos.

### Campos propuestos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | uuid | Identificador único de la categoría. |
| `business_id` | uuid | Negocio propietario. |
| `name` | text | Nombre de la categoría. |
| `description` | text | Descripción opcional. |
| `sort_order` | integer | Orden visual en la carta. |
| `is_active` | boolean | Si aparece o no en la carta. |
| `created_at` | timestamp | Fecha de creación. |
| `updated_at` | timestamp | Última actualización. |

### Relaciones

- Una `category` pertenece a un `business`.
- Una `category` tiene muchos `products`.

## Tabla: products

Representa productos de la carta.

### Para qué sirve

Gestiona pizzas, bebidas, entrantes, postres y combos.

### Campos propuestos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | uuid | Identificador único del producto. |
| `business_id` | uuid | Negocio propietario. |
| `category_id` | uuid | Categoría del producto. |
| `name` | text | Nombre del producto. |
| `description` | text | Descripción de ingredientes o detalles. |
| `price` | decimal | Precio base. |
| `image_url` | text | Imagen opcional. |
| `is_active` | boolean | Si está visible en carta. |
| `is_available` | boolean | Si está disponible para pedir. |
| `is_featured` | boolean | Si se destaca en carta o promociones. |
| `created_at` | timestamp | Fecha de creación. |
| `updated_at` | timestamp | Última actualización. |

### Relaciones

- Un `product` pertenece a un `business`.
- Un `product` pertenece a una `category`.
- Un `product` puede aparecer en muchos `orders`.

## Tabla: customers

Representa clientes finales de la pizzería.

### Para qué sirve

Permite mantener un CRM básico con historial, preferencias y recurrencia.

### Campos propuestos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | uuid | Identificador único del cliente. |
| `business_id` | uuid | Negocio al que pertenece. |
| `name` | text | Nombre del cliente. |
| `phone` | text | Teléfono o WhatsApp. |
| `email` | text | Email opcional. |
| `default_address` | text | Dirección habitual de reparto. |
| `tags` | jsonb | Etiquetas: `VIP`, `recurrente`, `promo`, etc. |
| `preferences` | jsonb | Preferencias: masa, ingredientes, canal favorito. |
| `total_orders` | integer | Número de pedidos acumulados. |
| `total_spent` | decimal | Gasto total acumulado. |
| `last_order_at` | timestamp | Fecha del último pedido. |
| `created_at` | timestamp | Fecha de creación. |
| `updated_at` | timestamp | Última actualización. |

### Relaciones

- Un `customer` pertenece a un `business`.
- Un `customer` puede tener muchos `orders`.
- Un `customer` puede tener muchos `reviews`.
- Un `customer` puede tener muchos `whatsapp_messages`.

## Tabla: orders

Representa pedidos de clientes.

### Para qué sirve

Permite gestionar la operación diaria: pedidos por WhatsApp, web, sala o teléfono.

### Campos propuestos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | uuid | Identificador único del pedido. |
| `business_id` | uuid | Negocio propietario. |
| `customer_id` | uuid | Cliente asociado, opcional si aún no está identificado. |
| `order_number` | text | Código visible del pedido: `#1048`. |
| `channel` | text | Canal: `whatsapp`, `web`, `phone`, `in_store`. |
| `status` | text | Estado: `pending`, `preparing`, `ready`, `out_for_delivery`, `delivered`, `cancelled`. |
| `fulfillment_type` | text | Tipo: `delivery`, `pickup`, `dine_in`. |
| `customer_name` | text | Nombre capturado en el pedido. |
| `customer_phone` | text | Teléfono capturado. |
| `delivery_address` | text | Dirección de reparto. |
| `items` | jsonb | Productos y cantidades para MVP inicial. |
| `subtotal` | decimal | Subtotal. |
| `delivery_fee` | decimal | Coste de reparto. |
| `total` | decimal | Total del pedido. |
| `notes` | text | Notas: sin cebolla, cambio, portal, etc. |
| `requested_at` | timestamp | Hora de entrada del pedido. |
| `completed_at` | timestamp | Hora de finalización. |
| `created_at` | timestamp | Fecha de creación. |
| `updated_at` | timestamp | Última actualización. |

### Relaciones

- Un `order` pertenece a un `business`.
- Un `order` puede pertenecer a un `customer`.
- En MVP se puede guardar `items` como `jsonb`.
- Más adelante puede crearse una tabla `order_items` si hace falta normalizar.

## Tabla: promotions

Representa campañas y promociones.

### Para qué sirve

Permite programar ofertas, reactivar clientes y medir campañas comerciales.

### Campos propuestos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | uuid | Identificador único de la promoción. |
| `business_id` | uuid | Negocio propietario. |
| `title` | text | Nombre de la promoción. |
| `description` | text | Descripción visible o interna. |
| `audience` | text | Segmento objetivo: recurrentes, inactivos, familias, etc. |
| `status` | text | Estado: `draft`, `active`, `scheduled`, `paused`, `completed`. |
| `starts_at` | timestamp | Fecha de inicio. |
| `ends_at` | timestamp | Fecha de fin. |
| `channel` | text | Canal: `whatsapp`, `web`, `in_store`. |
| `message_template` | text | Mensaje base para WhatsApp. |
| `sent_count` | integer | Mensajes enviados. |
| `redeemed_count` | integer | Promociones usadas. |
| `created_at` | timestamp | Fecha de creación. |
| `updated_at` | timestamp | Última actualización. |

### Relaciones

- Una `promotion` pertenece a un `business`.
- Puede usarse para segmentar `customers`.
- Puede generar `whatsapp_messages`.

## Tabla: reviews

Representa reseñas o feedback de clientes.

### Para qué sirve

Permite medir reputación, solicitar reseñas y detectar problemas de servicio.

### Campos propuestos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | uuid | Identificador único de la reseña. |
| `business_id` | uuid | Negocio propietario. |
| `customer_id` | uuid | Cliente asociado. |
| `order_id` | uuid | Pedido asociado, opcional. |
| `rating` | decimal | Puntuación. |
| `comment` | text | Texto de la reseña. |
| `source` | text | Fuente: `google`, `whatsapp`, `web`, `manual`. |
| `status` | text | Estado: `new`, `reviewed`, `resolved`. |
| `requested_at` | timestamp | Cuándo se solicitó la reseña. |
| `received_at` | timestamp | Cuándo se recibió. |
| `created_at` | timestamp | Fecha de creación. |
| `updated_at` | timestamp | Última actualización. |

### Relaciones

- Una `review` pertenece a un `business`.
- Una `review` puede pertenecer a un `customer`.
- Una `review` puede pertenecer a un `order`.

## Tabla: whatsapp_messages

Representa mensajes entrantes y salientes de WhatsApp.

### Para qué sirve

Permite auditar conversaciones, automatizaciones, pedidos guiados y campañas.

### Campos propuestos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | uuid | Identificador único del mensaje. |
| `business_id` | uuid | Negocio propietario. |
| `customer_id` | uuid | Cliente asociado, si se identifica. |
| `order_id` | uuid | Pedido relacionado, opcional. |
| `promotion_id` | uuid | Promoción relacionada, opcional. |
| `direction` | text | Dirección: `inbound` o `outbound`. |
| `message_type` | text | Tipo: `text`, `template`, `image`, `button`, etc. |
| `body` | text | Contenido del mensaje. |
| `automation_name` | text | Automatización que lo generó, si aplica. |
| `status` | text | Estado: `received`, `sent`, `delivered`, `read`, `failed`. |
| `external_message_id` | text | ID del proveedor de WhatsApp. |
| `sent_at` | timestamp | Fecha de envío. |
| `received_at` | timestamp | Fecha de recepción. |
| `created_at` | timestamp | Fecha de creación. |

### Relaciones

- Un `whatsapp_message` pertenece a un `business`.
- Puede pertenecer a un `customer`.
- Puede relacionarse con un `order`.
- Puede relacionarse con una `promotion`.

## Tabla: subscriptions

Representa la suscripción SaaS de cada negocio.

### Para qué sirve

Permite controlar planes, estado de pago y límites del SaaS.

### Campos propuestos

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | uuid | Identificador único de la suscripción. |
| `business_id` | uuid | Negocio suscrito. |
| `plan` | text | Plan: `starter`, `growth`, `pro`. |
| `status` | text | Estado: `trialing`, `active`, `past_due`, `cancelled`. |
| `billing_period` | text | Periodicidad: `monthly`, `yearly`. |
| `price_amount` | decimal | Precio del plan. |
| `currency` | text | Moneda, por ejemplo `EUR`. |
| `trial_ends_at` | timestamp | Fin de prueba. |
| `current_period_starts_at` | timestamp | Inicio del periodo actual. |
| `current_period_ends_at` | timestamp | Fin del periodo actual. |
| `external_customer_id` | text | ID del proveedor de pagos, futuro Stripe. |
| `external_subscription_id` | text | ID externo de suscripción. |
| `created_at` | timestamp | Fecha de creación. |
| `updated_at` | timestamp | Última actualización. |

### Relaciones

- Una `subscription` pertenece a un `business`.
- Un `business` puede tener varias suscripciones históricas, pero solo una activa.

## MVP recomendado

Para empezar, las tablas mínimas serían:

1. `businesses`
2. `users`
3. `customers`
4. `categories`
5. `products`
6. `orders`
7. `whatsapp_messages`

Después añadir:

8. `promotions`
9. `reviews`
10. `subscriptions`

## Decisiones pendientes

- Elegir proveedor de base de datos.
- Elegir sistema de autenticación.
- Decidir si `orders.items` empieza como `jsonb` o se normaliza con `order_items`.
- Definir si WhatsApp será integración directa, proveedor externo o flujo manual inicial.
- Definir límites por plan para `subscriptions`.
