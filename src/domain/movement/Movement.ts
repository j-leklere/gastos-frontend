export type Movement = {
  id: string;
  title: string;
  value: number;
  iso: "ARS" | "USD";
  kind: "income" | "expense";
  date: Date;
};
