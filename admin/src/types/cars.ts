export type Car = {
  id: string;
  image: string;
  imageInnovation?: string;
  model: string;
  price: string;
  priceForFacebook: number;
  acceleation: string;
  consumption: string;
  power: string;
  maxspeed: string;
  totalPrice: string;
  period: string;
  cost3years: string;
  firstMonthCost: string;
  warrantyDeposit: string;
  totalFirstPayment: string;
  lastPayment: string;
  priority: number;
  brand: string;
};

export type UpdateCarDTO = Omit<
  Car,
  | "image"
  | "imageInnovation"
  | "priceForFacebook"
  | "totalPrice"
  | "cost3years"
  | "firstMonthCost"
  | "warrantyDeposit"
  | "lastPayment"
  | "priority"
  | "brand"
>;

export type CreateCarDTO = Omit<
  Car,
  | "totalPrice"
  | "cost3years"
  | "priceForFacebook"
  | "firstMonthCost"
  | "warrantyDeposit"
  | "lastPayment"
  | "priority"
  | "brand"
>;
