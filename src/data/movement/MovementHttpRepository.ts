import {
  MovementRepository,
  MovementFilters
} from "../../domain/movement/MovementRepository";
import { Movement } from "../../domain/movement/Movement";
import { createApiClient } from "../../core/apiClient";
import { movementDto, movementDtoArray } from "./schemas";
import { toCreateDto, toDomain, toUpdateDto } from "./mappers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserIdFromToken } from "../../util/jwt";

const api = createApiClient({
  baseUrl: process.env.EXPO_PUBLIC_API_URL!,
  getToken: () => AsyncStorage.getItem("token")
});

async function getUserId(): Promise<number> {
  const token = await AsyncStorage.getItem("token");
  const userId = getUserIdFromToken(token);
  if (!userId) throw new Error("No user ID found in token");
  return userId;
}

export const movementRepo: MovementRepository = {
  async list(filters: MovementFilters): Promise<Movement[]> {
    // Fetch from both endpoints when type is "all" or undefined
    if (!filters.type || filters.type === "all") {
      const [expensesResult, incomesResult] = await Promise.allSettled([
        api.get<any>("expense/", {
          searchParams: { from: filters.from, to: filters.to }
        }),
        api.get<any>("income/", {
          searchParams: { from: filters.from, to: filters.to }
        })
      ]);

      const expenses: any[] = [];
      const incomes: any[] = [];

      if (expensesResult.status === "fulfilled") {
        const expensesContent =
          expensesResult.value.content || expensesResult.value;
        const parsedExpenses = movementDtoArray.parse(expensesContent);
        expenses.push(...parsedExpenses.map((dto) => toDomain(dto, "expense")));
      }

      if (incomesResult.status === "fulfilled") {
        const incomesContent =
          incomesResult.value.content || incomesResult.value;
        const parsedIncomes = movementDtoArray.parse(incomesContent);
        incomes.push(...parsedIncomes.map((dto) => toDomain(dto, "income")));
      }

      return [...expenses, ...incomes];
    }

    // Fetch from specific endpoint when type is specified
    const kind: "income" | "expense" =
      filters.type === "income" ? "income" : "expense";
    const endpoint = kind === "income" ? "income/" : "expense/";
    const response = await api.get<any>(endpoint, {
      searchParams: { from: filters.from, to: filters.to }
    });
    const content = response.content || response;
    const parsed = movementDtoArray.parse(content);
    return parsed.map((dto) => toDomain(dto, kind));
  },
  async getById(id: string, kind?: "income" | "expense"): Promise<Movement> {
    // If kind is provided, use it directly
    if (kind) {
      const endpoint = kind === "income" ? `income/${id}` : `expense/${id}`;
      const data = await api.get<any>(endpoint);
      const parsed = movementDto.parse(data);
      return toDomain(parsed, kind);
    }

    // Otherwise, try expense first, if not found try income
    try {
      const data = await api.get<any>(`expense/${id}`);
      const parsed = movementDto.parse(data);
      return toDomain(parsed, "expense");
    } catch (error) {
      const data = await api.get<any>(`income/${id}`);
      const parsed = movementDto.parse(data);
      return toDomain(parsed, "income");
    }
  },
  async create(input: Omit<Movement, "id">): Promise<Movement> {
    const userId = await getUserId();
    const endpoint = input.kind === "income" ? "income/" : "expense/";
    const data = await api.post<any>(endpoint, toCreateDto(input, userId));
    const parsed = movementDto.parse(data);
    return toDomain(parsed, input.kind);
  },
  async update(
    id: string,
    patch: Partial<Omit<Movement, "id">>
  ): Promise<Movement> {
    const userId = await getUserId();
    // Determine endpoint based on kind if provided, otherwise try expense first
    if (patch.kind) {
      const endpoint = patch.kind === "income" ? `income/${id}` : `expense/${id}`;
      const data = await api.put<any>(endpoint, toUpdateDto(patch, userId));
      const parsed = movementDto.parse(data);
      return toDomain(parsed, patch.kind);
    }

    // If kind is not provided, try expense first, then income
    try {
      const data = await api.put<any>(`expense/${id}`, toUpdateDto(patch, userId));
      const parsed = movementDto.parse(data);
      return toDomain(parsed, "expense");
    } catch (error) {
      const data = await api.put<any>(`income/${id}`, toUpdateDto(patch, userId));
      const parsed = movementDto.parse(data);
      return toDomain(parsed, "income");
    }
  },
  async remove(id: string): Promise<void> {
    // Try expense first, if not found try income
    try {
      await api.del(`expense/${id}`);
    } catch (error) {
      await api.del(`income/${id}`);
    }
  }
};
