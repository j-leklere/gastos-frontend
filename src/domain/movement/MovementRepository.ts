import { Movement } from "./Movement";

export type MovementFilters = {
  from?: string;
  to?: string;
  type?: "income" | "expense" | "all";
};

export interface MovementRepository {
  list(filters: MovementFilters): Promise<Movement[]>;
  getById(id: string, kind?: "income" | "expense"): Promise<Movement>;
  create(input: Omit<Movement, "id">): Promise<Movement>;
  update(id: string, patch: Partial<Omit<Movement, "id">>): Promise<Movement>;
  remove(id: string): Promise<void>;
}
