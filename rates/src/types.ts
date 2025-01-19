export type RateType = "crypto" | "fiat" | "commodity";

export interface Rate {
  name: string;
  unit: string;
  value: number;
  type: RateType;
}

export interface Rates {
  rates: Record<string, Rate>;
}

