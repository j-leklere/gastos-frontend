import { Movement } from "../../domain/movement/Movement";

export const toDomain = (dto: any, kind: "income" | "expense"): Movement => ({
  id: dto.id.toString(),
  title: dto.title,
  value: dto.amount,
  iso: dto.currency,
  kind,
  date: new Date(dto.date)
});

export const toCreateDto = (m: Omit<Movement, "id">, userId: number) => ({
  title: m.title,
  description: m.title,
  amount: m.value,
  currency: m.iso,
  categoryId: null,
  date: m.date.toISOString(),
  userId
});

export const toUpdateDto = (
  p: Partial<Omit<Movement, "id">>,
  userId: number
) => {
  const out: any = { userId };
  if (p.title !== undefined) {
    out.title = p.title;
    out.description = p.title;
  }
  if (p.value !== undefined) out.amount = p.value;
  if (p.iso !== undefined) out.currency = p.iso;
  if (p.date !== undefined) out.date = p.date.toISOString();
  return out;
};
