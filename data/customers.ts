export type MockCustomer = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalOrders: number;
  totalSpend: string;
  lastOrder: string;
  frequent: boolean;
};

export const mockCustomers: MockCustomer[] = [
  {
    id: "customer-laura",
    name: "Laura Martínez",
    phone: "+34 612 345 810",
    email: "laura.martinez@email.com",
    totalOrders: 18,
    totalSpend: "426,40€",
    lastOrder: "Hoy · 20:18",
    frequent: true,
  },
  {
    id: "customer-carlos",
    name: "Carlos Ruiz",
    phone: "+34 633 904 221",
    email: "carlos.r@email.com",
    totalOrders: 2,
    totalSpend: "48,70€",
    lastOrder: "Hoy · 20:07",
    frequent: false,
  },
  {
    id: "customer-ana-marcos",
    name: "Ana y Marcos",
    phone: "+34 690 332 118",
    totalOrders: 11,
    totalSpend: "287,20€",
    lastOrder: "Ayer · 21:14",
    frequent: true,
  },
  {
    id: "customer-nuria",
    name: "Nuria Pérez",
    phone: "+34 674 118 506",
    email: "nuria.perez@email.com",
    totalOrders: 6,
    totalSpend: "154,00€",
    lastOrder: "Hoy · 19:33",
    frequent: true,
  },
  {
    id: "customer-javier",
    name: "Javier López",
    phone: "+34 622 481 090",
    totalOrders: 1,
    totalSpend: "16,70€",
    lastOrder: "Hoy · 19:05",
    frequent: false,
  },
  {
    id: "customer-marta",
    name: "Marta García",
    phone: "+34 681 220 019",
    email: "marta.garcia@email.com",
    totalOrders: 9,
    totalSpend: "231,50€",
    lastOrder: "Hace 3 días",
    frequent: true,
  },
];

const frequentCustomers = mockCustomers.filter((customer) => customer.frequent);
const customersWithEmail = mockCustomers.filter((customer) => customer.email);

export const customerSummary = [
  {
    label: "Clientes",
    value: mockCustomers.length.toString(),
    detail: "registros mock activos",
  },
  {
    label: "Frecuentes",
    value: frequentCustomers.length.toString(),
    detail: "compran de forma recurrente",
  },
  {
    label: "Con email",
    value: customersWithEmail.length.toString(),
    detail: "listos para campañas",
  },
  {
    label: "Gasto total",
    value: "1.164,50€",
    detail: "base de clientes mock",
  },
];
