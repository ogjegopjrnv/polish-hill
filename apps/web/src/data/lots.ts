export type LotStatus = "available" | "reserved" | "sold";

export interface FloorPlan {
  floor: number;
  label: string;
  area: number;
  image?: string;
}

export interface Lot {
  id: string;
  /** Display number (e.g. "1", "2A") */
  number: string;
  /** Phase: 1 or 2 */
  phase: 1 | 2;
  status: LotStatus;
  /** Total area in m² (approximate) */
  area: number;
  /** Land plot area in m² */
  landArea: number;
  /** Number of floors */
  floors: number;
  /** Number of bedrooms */
  bedrooms: number;
  /** Number of bathrooms */
  bathrooms: number;
  /** Ceiling height in meters */
  ceilingHeight: number;
  /** Price per m² in USD */
  pricePerSqm: number;
  /** Computed total price in USD */
  totalPrice: number;
  /** Short description UK */
  descriptionUk: string;
  /** Short description EN */
  descriptionEn: string;
  /** Hero image */
  image: string;
  /** Floor plans */
  floorPlans: FloorPlan[];
  /** Features list */
  features: string[];
}

// Phase I — 12 cottages
// Phase II — 5 cottages
// Total: 17 cottages
// Phase II total land: 10 соток, individual plots vary
// Phase I: ~167 м², Phase II: 170 м²
export const lots: Lot[] = [
  // === Phase I (12 cottages) ===
  {
    id: "ph1-01",
    number: "1",
    phase: 1,
    status: "sold",
    area: 167,
    landArea: 1000,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 950,
    totalPrice: 167 * 950,
    descriptionUk: "Триповерховий котедж з мансардою. Перша черга, повністю здана.",
    descriptionEn: "Three-story cottage with attic. Phase I, fully delivered.",
    image: "/images/client/ph-14.jpg",
    floorPlans: [
      { floor: 1, label: "I поверх", area: 45.9, image: "/images/client/ph-3.jpg" },
      { floor: 2, label: "II поверх", area: 55.2, image: "/images/client/ph-4.jpg" },
      { floor: 3, label: "III поверх (мансарда)", area: 31.6, image: "/images/client/ph-5.jpg" },
    ],
    features: ["Камінопіч (опція)", "Тераса", "Паркомісце", "Автономне опалення"],
  },
  {
    id: "ph1-02",
    number: "2",
    phase: 1,
    status: "sold",
    area: 167,
    landArea: 1000,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 950,
    totalPrice: 167 * 950,
    descriptionUk: "Триповерховий котедж. Перша черга, повністю здана.",
    descriptionEn: "Three-story cottage. Phase I, fully delivered.",
    image: "/images/client/ph-14.jpg",
    floorPlans: [
      { floor: 1, label: "I поверх", area: 45.9 },
      { floor: 2, label: "II поверх", area: 55.2 },
      { floor: 3, label: "III поверх", area: 31.6 },
    ],
    features: ["Камінопіч (опція)", "Тераса", "Паркомісце", "Автономне опалення"],
  },
  {
    id: "ph1-03",
    number: "3",
    phase: 1,
    status: "sold",
    area: 167,
    landArea: 1000,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 950,
    totalPrice: 167 * 950,
    descriptionUk: "Триповерховий котедж. Перша черга.",
    descriptionEn: "Three-story cottage. Phase I.",
    image: "/images/client/ph-14.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Тераса", "Паркомісце"],
  },
  {
    id: "ph1-04",
    number: "4",
    phase: 1,
    status: "sold",
    area: 167,
    landArea: 1000,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 950,
    totalPrice: 167 * 950,
    descriptionUk: "Триповерховий котедж. Перша черга.",
    descriptionEn: "Three-story cottage. Phase I.",
    image: "/images/client/ph-14.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Тераса", "Паркомісце"],
  },
  {
    id: "ph1-05",
    number: "5",
    phase: 1,
    status: "sold",
    area: 167,
    landArea: 1000,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 950,
    totalPrice: 167 * 950,
    descriptionUk: "Триповерховий котедж. Перша черга.",
    descriptionEn: "Three-story cottage. Phase I.",
    image: "/images/client/ph-14.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Паркомісце"],
  },
  {
    id: "ph1-06",
    number: "6",
    phase: 1,
    status: "sold",
    area: 167,
    landArea: 1000,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 950,
    totalPrice: 167 * 950,
    descriptionUk: "Триповерховий котедж. Перша черга.",
    descriptionEn: "Three-story cottage. Phase I.",
    image: "/images/client/ph-14.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Паркомісце"],
  },
  {
    id: "ph1-07",
    number: "7",
    phase: 1,
    status: "sold",
    area: 167,
    landArea: 1000,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 950,
    totalPrice: 167 * 950,
    descriptionUk: "Триповерховий котедж. Перша черга.",
    descriptionEn: "Three-story cottage. Phase I.",
    image: "/images/client/ph-14.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Паркомісце"],
  },
  {
    id: "ph1-08",
    number: "8",
    phase: 1,
    status: "sold",
    area: 167,
    landArea: 1000,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 950,
    totalPrice: 167 * 950,
    descriptionUk: "Триповерховий котедж. Перша черга.",
    descriptionEn: "Three-story cottage. Phase I.",
    image: "/images/client/ph-14.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Паркомісце"],
  },
  {
    id: "ph1-09",
    number: "9",
    phase: 1,
    status: "sold",
    area: 167,
    landArea: 1000,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 950,
    totalPrice: 167 * 950,
    descriptionUk: "Триповерховий котедж. Перша черга.",
    descriptionEn: "Three-story cottage. Phase I.",
    image: "/images/client/ph-14.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Паркомісце"],
  },
  {
    id: "ph1-10",
    number: "10",
    phase: 1,
    status: "sold",
    area: 167,
    landArea: 1000,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 950,
    totalPrice: 167 * 950,
    descriptionUk: "Триповерховий котедж. Перша черга.",
    descriptionEn: "Three-story cottage. Phase I.",
    image: "/images/client/ph-14.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Паркомісце"],
  },
  {
    id: "ph1-11",
    number: "11",
    phase: 1,
    status: "sold",
    area: 167,
    landArea: 1000,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 950,
    totalPrice: 167 * 950,
    descriptionUk: "Триповерховий котедж. Перша черга.",
    descriptionEn: "Three-story cottage. Phase I.",
    image: "/images/client/ph-14.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Паркомісце"],
  },
  {
    id: "ph1-12",
    number: "12",
    phase: 1,
    status: "sold",
    area: 167,
    landArea: 1000,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 950,
    totalPrice: 167 * 950,
    descriptionUk: "Триповерховий котедж. Перша черга.",
    descriptionEn: "Three-story cottage. Phase I.",
    image: "/images/client/ph-14.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Паркомісце"],
  },

  // === Phase II (5 cottages) ===
  {
    id: "ph2-01",
    number: "13",
    phase: 2,
    status: "available",
    area: 170,
    landArea: 155,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 1000,
    totalPrice: 170 * 1000,
    descriptionUk: "Триповерховий таунхаус з мансардою. Друга черга — старт продажів. Вид на ліс. Ділянка 1.55 сот.",
    descriptionEn: "Three-story townhouse with attic. Phase II — sales started. Forest view. Plot 1.55 sotka.",
    image: "/images/client/ph-2.jpg",
    floorPlans: [
      { floor: 1, label: "I поверх", area: 45.9, image: "/images/client/ph-3.jpg" },
      { floor: 2, label: "II поверх", area: 55.2, image: "/images/client/ph-4.jpg" },
      { floor: 3, label: "III поверх (мансарда)", area: 31.6, image: "/images/client/ph-5.jpg" },
    ],
    features: ["Камінопіч (опція)", "Тераса", "Паркомісце x2", "Автономне опалення", "Безпроцентна розстрочка 1.5 року"],
  },
  {
    id: "ph2-02",
    number: "14",
    phase: 2,
    status: "available",
    area: 170,
    landArea: 120,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 1000,
    totalPrice: 170 * 1000,
    descriptionUk: "Триповерховий таунхаус. Друга черга. Панорамні вікна. Ділянка 1.2 сот.",
    descriptionEn: "Three-story townhouse. Phase II. Panoramic windows. Plot 1.2 sotka.",
    image: "/images/client/ph-2.jpg",
    floorPlans: [
      { floor: 1, label: "I поверх", area: 45.9 },
      { floor: 2, label: "II поверх", area: 55.2 },
      { floor: 3, label: "III поверх", area: 31.6 },
    ],
    features: ["Камінопіч (опція)", "Тераса", "Паркомісце x2", "Автономне опалення", "Безпроцентна розстрочка 1.5 року"],
  },
  {
    id: "ph2-03",
    number: "15",
    phase: 2,
    status: "available",
    area: 170,
    landArea: 120,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 1000,
    totalPrice: 170 * 1000,
    descriptionUk: "Триповерховий таунхаус. Друга черга. Ділянка 1.2 сот.",
    descriptionEn: "Three-story townhouse. Phase II. Plot 1.2 sotka.",
    image: "/images/client/ph-2.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Тераса", "Паркомісце", "Безпроцентна розстрочка 1.5 року"],
  },
  {
    id: "ph2-04",
    number: "16",
    phase: 2,
    status: "available",
    area: 170,
    landArea: 120,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 1000,
    totalPrice: 170 * 1000,
    descriptionUk: "Триповерховий таунхаус. Друга черга. Ділянка 1.2 сот.",
    descriptionEn: "Three-story townhouse. Phase II. Plot 1.2 sotka.",
    image: "/images/client/ph-2.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Тераса", "Паркомісце", "Безпроцентна розстрочка 1.5 року"],
  },
  {
    id: "ph2-05",
    number: "17",
    phase: 2,
    status: "available",
    area: 170,
    landArea: 294,
    floors: 3,
    bedrooms: 4,
    bathrooms: 2,
    ceilingHeight: 2.8,
    pricePerSqm: 1000,
    totalPrice: 170 * 1000,
    descriptionUk: "Триповерховий кутовий таунхаус. Друга черга. Вид на озеро. Ділянка 2.94 сот.",
    descriptionEn: "Three-story corner townhouse. Phase II. Lake view. Plot 2.94 sotka.",
    image: "/images/client/ph-2.jpg",
    floorPlans: [],
    features: ["Камінопіч (опція)", "Тераса", "Паркомісце x2", "Кутовий", "Вид на озеро", "Безпроцентна розстрочка 1.5 року"],
  },
];

export function getLotById(id: string): Lot | undefined {
  return lots.find((l) => l.id === id);
}

export function getLotsByPhase(phase: 1 | 2): Lot[] {
  return lots.filter((l) => l.phase === phase);
}

export function getAvailableLots(): Lot[] {
  return lots.filter((l) => l.status === "available");
}

export function formatPrice(usd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

export function statusLabelUk(status: LotStatus): string {
  return { available: "Вільний", reserved: "Резерв", sold: "Продано" }[status];
}

export function statusLabelEn(status: LotStatus): string {
  return { available: "Available", reserved: "Reserved", sold: "Sold" }[status];
}
