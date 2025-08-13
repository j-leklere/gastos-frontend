export type Currency = "ARS" | "USD" | "EUR";

export type Movement = {
  id: string;
  amount: number;
  currency: Currency;
  date: string;
  title?: string;
  description?: string;
  categoryId?: string;
};
