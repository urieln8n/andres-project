# MVP Roadmap - Andres Project for Pizzerias

## Objetivo

Convertir Andres Project for Pizzerias en un SaaS simple para pizzerias locales que permita vender mejor, gestionar pedidos, organizar clientes y automatizar comunicacion por WhatsApp.

El roadmap prioriza avanzar con poco riesgo tecnico: primero UI y validacion comercial, despues datos reales, y finalmente automatizaciones, pagos e IA.

## Orden Recomendado

| Orden | Fase | Prioridad | Dificultad | Resultado esperado |
| --- | --- | --- | --- | --- |
| 1 | MVP 1: Landing + dashboard mock | Alta | Baja | Validar propuesta y mostrar producto visual |
| 2 | MVP 2: Menu digital | Alta | Media | Primera funcionalidad real para pizzerias |
| 3 | MVP 3: Pedidos | Alta | Media/Alta | Capturar y gestionar pedidos |
| 4 | MVP 4: Clientes | Media/Alta | Media | Base de clientes y repeticion de compra |
| 5 | MVP 5: WhatsApp automation | Alta | Alta | Automatizar contacto y seguimiento |
| 6 | MVP 6: Pagos/suscripciones | Media | Alta | Monetizar el SaaS |
| 7 | MVP 7: IA para promociones | Media | Media/Alta | Diferenciacion y mejora comercial |

## MVP 1: Landing + Dashboard Mock

**Estado:** En progreso avanzado.

### Objetivo

Tener una primera version visual que explique claramente el producto y muestre como seria el panel para una pizzeria.

### Incluye

- Landing enfocada en SaaS para pizzerias.
- Dashboard visual con datos mock.
- Secciones de beneficios, funciones, planes y CTA.
- Paginas mock para pedidos, clientes, menu, promociones y ajustes.
- Documentacion inicial del roadmap y modelo de datos.

### Prioridad

Alta. Es la base para presentar el producto, validar interes y enseñar una demo sin backend.

### Dificultad

Baja. No requiere base de datos, autenticacion ni integraciones externas.

### Criterio de terminado

- La landing explica que hace Andres Project for Pizzerias.
- El dashboard parece un producto real.
- Las paginas principales existen aunque usen datos mock.
- El proyecto compila sin errores.

## MVP 2: Menu Digital

### Objetivo

Permitir que una pizzeria gestione su menu digital desde el panel.

### Incluye

- CRUD de categorias.
- CRUD de productos.
- Campos basicos: nombre, descripcion, precio, categoria, disponibilidad e imagen opcional.
- Estado disponible/no disponible.
- Vista publica simple del menu.

### Prioridad

Alta. El menu es el primer activo real que una pizzeria necesita configurar antes de recibir pedidos.

### Dificultad

Media. Requiere base de datos, formularios, validacion y separacion por negocio.

### Datos necesarios

- `businesses`
- `users`
- `categories`
- `products`

### Riesgos

- Complicar demasiado variantes, tamanos e ingredientes desde el inicio.
- Mezclar datos de varias pizzerias sin un buen `business_id`.
- Subir imagenes antes de tener una estrategia clara de almacenamiento.

### Recomendacion

Empezar sin imagenes obligatorias y sin variantes avanzadas. Primero productos simples.

## MVP 3: Pedidos

### Objetivo

Permitir que una pizzeria reciba, consulte y cambie el estado de pedidos.

### Incluye

- Crear pedidos desde una pagina publica o formulario simple.
- Listado de pedidos en dashboard.
- Estados: nuevo, preparando, listo, entregado, cancelado.
- Datos de cliente, productos, total y notas.
- Filtro por estado y fecha.

### Prioridad

Alta. Es el centro operativo del SaaS.

### Dificultad

Media/Alta. Los pedidos conectan productos, clientes, negocio, estados y notificaciones.

### Datos necesarios

- `orders`
- `customers`
- `products`
- `businesses`

### Riesgos

- No definir bien el formato de productos dentro del pedido.
- Cambios de precio despues de hacer un pedido.
- Duplicar clientes por telefono mal normalizado.
- Crear demasiada logica de delivery antes del MVP.

### Recomendacion

Guardar una copia simple del producto y precio dentro del pedido para evitar problemas si el menu cambia despues.

## MVP 4: Clientes

### Objetivo

Crear una base de clientes para que la pizzeria pueda ver historial, frecuencia y oportunidades de recompra.

### Incluye

- Listado de clientes.
- Perfil basico del cliente.
- Telefono, nombre, email opcional y direccion opcional.
- Historial de pedidos.
- Etiquetas simples: frecuente, nuevo, inactivo.

### Prioridad

Media/Alta. Aporta valor comercial y prepara WhatsApp automation.

### Dificultad

Media. Depende de que pedidos y telefonos esten bien organizados.

### Datos necesarios

- `customers`
- `orders`
- `whatsapp_messages` en fases posteriores.

### Riesgos

- Guardar datos personales sin politica clara.
- No pedir consentimiento para mensajes.
- No evitar duplicados por telefono.

### Recomendacion

Usar el telefono como identificador principal del cliente dentro de cada negocio.

## MVP 5: WhatsApp Automation

### Objetivo

Automatizar mensajes importantes para aumentar ventas y reducir trabajo manual.

### Incluye

- Mensaje de confirmacion de pedido.
- Mensaje cuando el pedido este listo.
- Mensaje de seguimiento despues de compra.
- Campanas simples para clientes inactivos.
- Registro de mensajes enviados.

### Prioridad

Alta. Es una de las propuestas de valor principales de Andres Project.

### Dificultad

Alta. Requiere integracion externa, control de permisos, logs y manejo de errores.

### Datos necesarios

- `whatsapp_messages`
- `customers`
- `orders`
- `businesses`

### Riesgos

- Enviar mensajes duplicados.
- Falta de consentimiento del cliente.
- Costes o limites de la API de WhatsApp.
- Plantillas rechazadas o mal configuradas.
- Dependencia de un proveedor externo.

### Recomendacion

Primero crear logs y simulacion interna. Despues conectar WhatsApp real cuando el flujo este probado.

## MVP 6: Pagos/Suscripciones

### Objetivo

Monetizar el SaaS con planes mensuales para pizzerias.

### Incluye

- Plan gratis o demo.
- Plan basico.
- Plan profesional.
- Estado de suscripcion.
- Limites por plan.
- Integracion futura con Stripe.

### Prioridad

Media. Es importante para negocio, pero no debe bloquear la validacion inicial.

### Dificultad

Alta. Requiere pagos, webhooks, estados de suscripcion y control de acceso.

### Datos necesarios

- `subscriptions`
- `businesses`
- `users`

### Riesgos

- Implementar Stripe demasiado pronto.
- No controlar bien webhooks.
- Permitir acceso a funciones premium sin validar suscripcion.
- Crear demasiados planes antes de saber que vender.

### Recomendacion

Primero guardar estado manual de suscripcion en base de datos. Integrar Stripe cuando ya haya usuarios interesados.

## MVP 7: IA Para Promociones

### Objetivo

Usar IA para ayudar a la pizzeria a generar promociones, mensajes y recomendaciones comerciales.

### Incluye

- Generador de promociones.
- Ideas de campanas para clientes inactivos.
- Textos para WhatsApp.
- Recomendaciones basadas en productos mas vendidos.
- Sugerencias por dia de la semana o baja demanda.

### Prioridad

Media. Es diferencial, pero necesita datos previos para aportar valor real.

### Dificultad

Media/Alta. La parte inicial puede ser simple, pero la personalizacion real necesita datos.

### Datos necesarios

- `orders`
- `products`
- `customers`
- `promotions`
- `whatsapp_messages`

### Riesgos

- Prometer IA avanzada antes de tener datos suficientes.
- Generar promociones poco utiles o demasiado genericas.
- No revisar costes de uso.
- Automatizar mensajes sin control humano.

### Recomendacion

Empezar con IA asistida, no automatica. La pizzeria revisa y aprueba cada promocion antes de enviarla.

## Prioridades Por Impacto

### Prioridad Alta

1. Landing clara y demo visual.
2. Menu digital editable.
3. Pedidos.
4. WhatsApp automation basica.

### Prioridad Media

1. Clientes y segmentacion simple.
2. Promociones manuales.
3. Suscripciones.
4. IA asistida.

### Prioridad Baja Inicial

1. Multi-sucursal.
2. Roles avanzados.
3. Inventario.
4. Delivery avanzado.
5. Analitica profunda.
6. App movil nativa.

## Dificultad Estimada

| Area | Dificultad | Motivo |
| --- | --- | --- |
| Landing | Baja | Ya existe base visual |
| Dashboard mock | Baja | Usa datos locales |
| Menu digital | Media | Requiere CRUD y base de datos |
| Pedidos | Media/Alta | Conecta varios modelos |
| Clientes | Media | Depende de pedidos y normalizacion |
| WhatsApp | Alta | Integracion externa y consentimiento |
| Suscripciones | Alta | Pagos, webhooks y limites |
| IA | Media/Alta | Necesita datos y control de costes |

## Primera Implementacion Recomendada

La siguiente fase real deberia ser:

1. Preparar Supabase sin conectar todo el producto.
2. Crear tablas `businesses`, `users`, `categories` y `products`.
3. Implementar autenticacion basica.
4. Conectar solo la pagina de menu a datos reales.
5. Mantener pedidos, clientes, promociones y WhatsApp con mock data hasta que el menu funcione bien.

Este orden reduce riesgo porque convierte una parte pequena del SaaS en funcional sin reescribir todo el dashboard.

## Regla De Producto Para No Romper El MVP

Cada fase debe cumplir una regla:

> Si una funcionalidad no ayuda a una pizzeria local a vender, gestionar pedidos o recuperar clientes, no entra todavia.

## Resultado Final Esperado

Al completar el roadmap, Andres Project for Pizzerias deberia permitir que una pizzeria:

- Cree una cuenta.
- Configure su negocio.
- Publique su menu digital.
- Reciba pedidos.
- Gestione clientes.
- Automatice mensajes por WhatsApp.
- Lance promociones.
- Pague una suscripcion mensual.
- Use IA para mejorar campanas y ventas.
