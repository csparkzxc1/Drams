export type Region =
  | "Islay" | "Speyside" | "Highland" | "Lowland" | "Campbeltown"
  | "Japanese" | "Bourbon" | "Irish" | "Indian" | "Other";

export type WhiskyType =
  | "Single Malt" | "Blended Malt" | "Blended"
  | "Bourbon" | "Rye" | "Irish" | "Japanese" | "Other";

export type ServingStyle = "neat" | "rocks" | "water" | "highball" | "other";
export type BottleStatus = "owned" | "tasted" | "wishlist";
export type Lang = "ko" | "en";

export type Bottle = {
  id: string;
  name: string;
  distillery: string;
  region: Region;
  type: WhiskyType;
  age: number | null;
  abv: number;
  caskStrength: boolean;
  caskStrengthAbv?: number;
  purchasePrice?: number;
  purchaseDate?: string;
  purchaseLocation?: string;
  photoUri?: string;
  status: BottleStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type Entry = {
  id: string;
  serialNumber: number;
  bottleId: string;
  tastedAt: string;
  location?: string;
  servingStyle: ServingStyle;
  nose: string;
  palate: string;
  finish: string;
  rating: number;
  tags: string[];
  blind: boolean;
  companions?: string;
  photoUri?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type Member = {
  id: string;
  memberNumber: number | null;
  memberSince: string;
  displayName: string;
  language: Lang;
  isPro: boolean;
  proSince?: string;
};

export type Settings = {
  language: Lang;
  unit: "ml" | "oz";
  notifications: boolean;
  schemaVersion: number;
};

export type StoreData = {
  member: Member;
  bottles: Bottle[];
  entries: Entry[];
  settings: Settings;
};
