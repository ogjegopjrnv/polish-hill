export type LotStatus = "available" | "reserved" | "sold";

export interface Lot {
  id: string;
  number: string;
  status: LotStatus;
  area: number;
  floors: number;
  ceilingHeight: number;
  totalPrice: number;
  descriptionUk: string;
  image: string;
  features: string[];
}

export const lots: Lot[] = [
  {
    id: "duplex-a1",
    number: "A1",
    status: "available",
    area: 195,
    floors: 3,
    ceilingHeight: 2.8,
    totalPrice: 195_000,
    descriptionUk: "Секція дуплексу 195 м². Три поверхи, вбудоване паркомісце, власна ділянка.",
    image: "/images/client/duplex-crop-a1.jpg",
    features: ["Паркомісце", "Автономне опалення", "Артезіанська свердловина", "Розтермінування 18 міс"],
  },
  {
    id: "duplex-a2",
    number: "A2",
    status: "available",
    area: 200,
    floors: 3,
    ceilingHeight: 2.8,
    totalPrice: 200_000,
    descriptionUk: "Секція дуплексу 200 м². Три поверхи, вбудоване паркомісце, власна ділянка.",
    image: "/images/client/duplex-crop-a2.jpg",
    features: ["Паркомісце", "Автономне опалення", "Артезіанська свердловина", "Розтермінування 18 міс"],
  },
  {
    id: "duplex-b1",
    number: "B1",
    status: "available",
    area: 195,
    floors: 3,
    ceilingHeight: 2.8,
    totalPrice: 195_000,
    descriptionUk: "Секція дуплексу 195 м². Три поверхи, вбудоване паркомісце, власна ділянка.",
    image: "/images/client/duplex-crop-b1.jpg",
    features: ["Паркомісце", "Автономне опалення", "Артезіанська свердловина", "Розтермінування 18 міс"],
  },
  {
    id: "duplex-b2",
    number: "B2",
    status: "available",
    area: 200,
    floors: 3,
    ceilingHeight: 2.8,
    totalPrice: 200_000,
    descriptionUk: "Секція дуплексу 200 м². Три поверхи, вбудоване паркомісце, власна ділянка.",
    image: "/images/client/duplex-crop-b2.jpg",
    features: ["Паркомісце", "Автономне опалення", "Артезіанська свердловина", "Розтермінування 18 міс"],
  },
];

export function getLotById(id: string): Lot | undefined {
  return lots.find((l) => l.id === id);
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
