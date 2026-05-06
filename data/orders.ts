export type OrderStatus =
  | "Nuevo"
  | "Preparando"
  | "Listo"
  | "Entregado"
  | "Cancelado";

export type OrderMethod = "Recoger" | "Local" | "Delivery";

export type MockOrder = {
  id: string;
  status: OrderStatus;
  customer: string;
  products: string[];
  total: string;
  method: OrderMethod;
  time: string;
};

export const orderStatusFlow: OrderStatus[] = [
  "Nuevo",
  "Preparando",
  "Listo",
  "Entregado",
  "Cancelado",
];

export const mockOrders: MockOrder[] = [
  {
    id: "#1052",
    status: "Nuevo",
    customer: "Laura M.",
    products: ["2 Pizza Margherita", "1 Coca-Cola 500ml"],
    total: "24,50€",
    method: "Delivery",
    time: "20:18",
  },
  {
    id: "#1051",
    status: "Preparando",
    customer: "Carlos R.",
    products: ["1 Pizza Diavola", "1 Pan de ajo"],
    total: "19,80€",
    method: "Recoger",
    time: "20:07",
  },
  {
    id: "#1050",
    status: "Listo",
    customer: "Mesa 4",
    products: ["1 Combo pareja", "1 Agua mineral"],
    total: "26,70€",
    method: "Local",
    time: "19:54",
  },
  {
    id: "#1049",
    status: "Entregado",
    customer: "Nuria P.",
    products: ["1 Combo familiar", "1 Tiramisú"],
    total: "45,90€",
    method: "Delivery",
    time: "19:33",
  },
  {
    id: "#1048",
    status: "Preparando",
    customer: "Ana y Marcos",
    products: ["1 Pizza Cuatro Quesos", "1 Salsa picante"],
    total: "16,70€",
    method: "Recoger",
    time: "19:22",
  },
  {
    id: "#1047",
    status: "Cancelado",
    customer: "Javier L.",
    products: ["1 Pizza Prosciutto", "1 Limonada casera"],
    total: "16,70€",
    method: "Delivery",
    time: "19:05",
  },
];

const pendingStatuses: OrderStatus[] = ["Nuevo", "Preparando", "Listo"];

export const orderSummary = [
  {
    label: "Pedidos de hoy",
    value: mockOrders.length.toString(),
    detail: "mock operativo para cocina",
  },
  {
    label: "Ingresos",
    value: "149,60€",
    detail: "sin pedidos cancelados",
  },
  {
    label: "Pendientes",
    value: mockOrders
      .filter((order) => pendingStatuses.includes(order.status))
      .length.toString(),
    detail: "requieren seguimiento",
  },
];
