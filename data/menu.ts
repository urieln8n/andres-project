export type MenuCategory = {
  id: string;
  name: string;
  description: string;
};

export type MenuProduct = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: string;
  status: "Disponible" | "No disponible";
  tag?: string;
};

export const menuCategories: MenuCategory[] = [
  {
    id: "pizzas",
    name: "Pizzas",
    description: "Clásicas y especiales con masa artesanal.",
  },
  {
    id: "bebidas",
    name: "Bebidas",
    description: "Refrescos, agua y bebidas para completar el pedido.",
  },
  {
    id: "extras",
    name: "Extras",
    description: "Entrantes, salsas y complementos de alta rotación.",
  },
  {
    id: "combos",
    name: "Combos",
    description: "Ofertas listas para vender más por pedido.",
  },
];

export const menuProducts: MenuProduct[] = [
  {
    id: "pizza-margherita",
    name: "Pizza Margherita",
    categoryId: "pizzas",
    description: "Tomate, mozzarella, albahaca fresca y aceite de oliva.",
    price: "11,00€",
    status: "Disponible",
    tag: "Más vendida",
  },
  {
    id: "pizza-diavola",
    name: "Pizza Diavola",
    categoryId: "pizzas",
    description: "Tomate, mozzarella, salami picante y orégano.",
    price: "14,90€",
    status: "Disponible",
  },
  {
    id: "pizza-prosciutto",
    name: "Pizza Prosciutto",
    categoryId: "pizzas",
    description: "Tomate, mozzarella, jamón cocido y champiñones.",
    price: "13,50€",
    status: "No disponible",
  },
  {
    id: "pizza-cuatro-quesos",
    name: "Pizza Cuatro Quesos",
    categoryId: "pizzas",
    description: "Mozzarella, gorgonzola, parmesano y provolone.",
    price: "15,50€",
    status: "Disponible",
  },
  {
    id: "coca-cola",
    name: "Coca-Cola 500ml",
    categoryId: "bebidas",
    description: "Bebida fría individual.",
    price: "2,50€",
    status: "Disponible",
  },
  {
    id: "agua-mineral",
    name: "Agua mineral",
    categoryId: "bebidas",
    description: "Botella de agua mineral 500ml.",
    price: "1,80€",
    status: "Disponible",
  },
  {
    id: "limonada-casera",
    name: "Limonada casera",
    categoryId: "bebidas",
    description: "Limonada fresca preparada en local.",
    price: "3,20€",
    status: "No disponible",
  },
  {
    id: "pan-ajo",
    name: "Pan de ajo",
    categoryId: "extras",
    description: "Pan horneado con ajo, perejil y queso fundido.",
    price: "4,90€",
    status: "Disponible",
    tag: "Recomendado",
  },
  {
    id: "salsa-picante",
    name: "Salsa picante",
    categoryId: "extras",
    description: "Salsa casera para añadir al pedido.",
    price: "1,20€",
    status: "Disponible",
  },
  {
    id: "tiramisú",
    name: "Tiramisú",
    categoryId: "extras",
    description: "Postre casero por ración.",
    price: "6,00€",
    status: "Disponible",
  },
  {
    id: "combo-familiar",
    name: "Combo familiar",
    categoryId: "combos",
    description: "2 pizzas medianas, pan de ajo y bebida grande.",
    price: "39,90€",
    status: "Disponible",
    tag: "Mayor ticket",
  },
  {
    id: "combo-pareja",
    name: "Combo pareja",
    categoryId: "combos",
    description: "1 pizza grande, 2 bebidas y un extra a elegir.",
    price: "24,90€",
    status: "Disponible",
  },
];

export const menuHighlights = [
  { label: "Categorías", value: "4", detail: "pizzas, bebidas, extras y combos" },
  { label: "Productos", value: "12", detail: "9 disponibles ahora" },
  { label: "Ticket sugerido", value: "24,90€", detail: "combo pareja destacado" },
  { label: "Sin stock", value: "2", detail: "productos no disponibles" },
];
