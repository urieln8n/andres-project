export type PromotionChannel = "WhatsApp" | "Instagram" | "Local";
export type PromotionStatus = "Activa" | "Inactiva";

export type MockPromotion = {
  id: string;
  name: string;
  description: string;
  discount: string;
  startDate: string;
  endDate: string;
  status: PromotionStatus;
  channel: PromotionChannel;
};

export type AiPromotionIdea = {
  id: string;
  title: string;
  reason: string;
  suggestedDiscount: string;
  channel: PromotionChannel;
};

export const mockPromotions: MockPromotion[] = [
  {
    id: "promo-martes-2x1",
    name: "Martes 2x1",
    description: "Promoción para aumentar pedidos en el día más flojo de la semana.",
    discount: "2x1 en pizzas medianas",
    startDate: "07/05/2026",
    endDate: "28/05/2026",
    status: "Activa",
    channel: "WhatsApp",
  },
  {
    id: "promo-combo-familiar",
    name: "Combo familiar fin de semana",
    description: "Oferta para familias con ticket medio alto durante viernes y sábado.",
    discount: "15% en combo familiar",
    startDate: "08/05/2026",
    endDate: "31/05/2026",
    status: "Activa",
    channel: "Instagram",
  },
  {
    id: "promo-postre-gratis",
    name: "Postre gratis",
    description: "Incentivo para pedidos grandes con recogida en local.",
    discount: "Tiramisú gratis desde 35€",
    startDate: "01/05/2026",
    endDate: "15/05/2026",
    status: "Inactiva",
    channel: "Local",
  },
  {
    id: "promo-clientes-inactivos",
    name: "Reactiva clientes inactivos",
    description: "Campaña para clientes sin pedido en los últimos 30 días.",
    discount: "10% en el próximo pedido",
    startDate: "10/05/2026",
    endDate: "24/05/2026",
    status: "Activa",
    channel: "WhatsApp",
  },
];

export const promotionSummary = [
  {
    label: "Promociones",
    value: mockPromotions.length.toString(),
    detail: "campañas mock creadas",
  },
  {
    label: "Activas",
    value: mockPromotions
      .filter((promotion) => promotion.status === "Activa")
      .length.toString(),
    detail: "listas para enviar",
  },
  {
    label: "WhatsApp",
    value: mockPromotions
      .filter((promotion) => promotion.channel === "WhatsApp")
      .length.toString(),
    detail: "canal sugerido principal",
  },
  {
    label: "Ideas IA",
    value: "3",
    detail: "solo mock, sin IA real",
  },
];

export const aiPromotionIdeas: AiPromotionIdea[] = [
  {
    id: "idea-lluvia",
    title: "Noche de lluvia",
    reason: "Usar mal tiempo como disparador para delivery con mensaje cercano.",
    suggestedDiscount: "Envío gratis desde 22€",
    channel: "WhatsApp",
  },
  {
    id: "idea-lunes",
    title: "Lunes de masa artesanal",
    reason: "Mover demanda hacia un día normalmente más bajo.",
    suggestedDiscount: "20% en segunda pizza",
    channel: "Instagram",
  },
  {
    id: "idea-local",
    title: "Recoge y ahorra",
    reason: "Reducir coste de reparto e incentivar visitas al local.",
    suggestedDiscount: "Bebida gratis al recoger",
    channel: "Local",
  },
];
