export const todayOrders = [
  {
    id: "#1048",
    customer: "Laura M.",
    items: "2 Margherita, 1 Coca-Cola",
    channel: "WhatsApp",
    status: "Preparando",
    total: "32,50€",
    time: "20:12",
  },
  {
    id: "#1047",
    customer: "Carlos R.",
    items: "1 Diavola, 1 Tiramisú",
    channel: "Web",
    status: "En reparto",
    total: "24,90€",
    time: "20:05",
  },
  {
    id: "#1046",
    customer: "Mesa 4",
    items: "3 Prosciutto, 2 agua",
    channel: "Sala",
    status: "Servido",
    total: "51,00€",
    time: "19:48",
  },
  {
    id: "#1045",
    customer: "Nuria P.",
    items: "Combo familiar",
    channel: "WhatsApp",
    status: "Pendiente",
    total: "39,90€",
    time: "19:41",
  },
];

export const salesSummary = [
  { label: "Ventas del día", value: "1.284€", detail: "+18% vs ayer" },
  { label: "Pedidos", value: "47", detail: "31 delivery · 16 sala" },
  { label: "Ticket medio", value: "27,30€", detail: "+3,80€ vs semana pasada" },
  { label: "Tiempo medio", value: "23 min", detail: "preparación estimada" },
];

export const customers = [
  { name: "Laura M.", tag: "VIP", orders: 18, last: "Hoy", spend: "426€" },
  { name: "Carlos R.", tag: "Nuevo", orders: 2, last: "Hoy", spend: "48€" },
  { name: "Ana y Marcos", tag: "Recurrente", orders: 11, last: "Ayer", spend: "287€" },
  { name: "Nuria P.", tag: "Promo", orders: 6, last: "Hoy", spend: "154€" },
];

export const topProducts = [
  { name: "Pizza Margherita", sold: 21, revenue: "231€", trend: "+12%", category: "Pizzas", price: "11,00€", status: "Disponible" },
  { name: "Combo familiar", sold: 14, revenue: "558€", trend: "+24%", category: "Combos", price: "39,90€", status: "Disponible" },
  { name: "Pizza Diavola", sold: 12, revenue: "178€", trend: "+8%", category: "Pizzas", price: "14,90€", status: "Disponible" },
  { name: "Tiramisú", sold: 9, revenue: "54€", trend: "+5%", category: "Postres", price: "6,00€", status: "Disponible" },
];

export const menuItems = [
  {
    name: "Pizza Margherita",
    category: "Pizzas",
    price: "11,00€",
    status: "Disponible",
    description: "Tomate, mozzarella, albahaca y aceite de oliva.",
  },
  {
    name: "Pizza Diavola",
    category: "Pizzas",
    price: "14,90€",
    status: "Disponible",
    description: "Tomate, mozzarella, salami picante y oregano.",
  },
  {
    name: "Combo familiar",
    category: "Combos",
    price: "39,90€",
    status: "Disponible",
    description: "2 pizzas medianas, entrante y bebida grande.",
  },
  {
    name: "Tiramisú",
    category: "Postres",
    price: "6,00€",
    status: "Disponible",
    description: "Postre casero por ración.",
  },
  {
    name: "Pizza Prosciutto",
    category: "Pizzas",
    price: "13,50€",
    status: "Agotada",
    description: "Tomate, mozzarella, jamón cocido y champiñones.",
  },
];

export const promotions = [
  {
    title: "Martes 2x1",
    status: "Activa",
    audience: "Clientes sin pedido en 30 días",
    result: "18 pedidos recuperados",
  },
  {
    title: "Combo familiar fin de semana",
    status: "Programada",
    audience: "Familias recurrentes",
    result: "Sale el viernes 18:00",
  },
  {
    title: "Postre gratis",
    status: "Pausada",
    audience: "Pedidos superiores a 30€",
    result: "Revisar margen",
  },
];

export const pizzeriaSettings = {
  name: "Pizzería Napoli",
  whatsapp: "+34 600 000 000",
  address: "Calle Mayor 24, Madrid",
  deliveryZones: ["Centro", "Retiro", "Salamanca", "Chamberí"],
  openingHours: [
    { day: "Lunes - Jueves", hours: "18:30 - 23:30" },
    { day: "Viernes - Sábado", hours: "18:30 - 00:30" },
    { day: "Domingo", hours: "19:00 - 23:30" },
  ],
  prepTime: "23 min",
  deliveryFee: "2,90€",
  minimumOrder: "14,00€",
  tone: "Cercano, rápido y familiar",
};

export const reviews = [
  {
    author: "Marta G.",
    rating: "5.0",
    text: "Entrega rápida y la pizza llegó perfecta. Repetiremos.",
    source: "Google",
  },
  {
    author: "Javier L.",
    rating: "4.8",
    text: "Muy buena atención por WhatsApp y pedido sencillo.",
    source: "WhatsApp",
  },
  {
    author: "Elena S.",
    rating: "4.6",
    text: "La promo familiar merece la pena. Buena masa.",
    source: "Web",
  },
];

export const whatsappAutomations = [
  {
    name: "Responder carta y horarios",
    status: "Activa",
    runs: "126 usos hoy",
  },
  {
    name: "Recoger dirección de reparto",
    status: "Activa",
    runs: "31 pedidos guiados",
  },
  {
    name: "Reactivar clientes inactivos",
    status: "Programada",
    runs: "84 contactos mañana",
  },
  {
    name: "Pedir reseña tras entrega",
    status: "Activa",
    runs: "19 mensajes enviados",
  },
];
