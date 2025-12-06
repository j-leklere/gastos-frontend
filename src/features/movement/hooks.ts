import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { qk } from "../../core/queryKeys";
import { movementRepo } from "../../data/movement/MovementHttpRepository";

export const useMovements = (filters: any) =>
  useQuery({
    queryKey: qk.movements.list(filters),
    queryFn: () => movementRepo.list(filters),
    select: (rows: any[]) =>
      rows.sort((a, b) => b.date.getTime() - a.date.getTime())
  });

export const useMovement = (id: string | undefined) =>
  useQuery({
    queryKey: qk.movements.byId(id!),
    queryFn: () => movementRepo.getById(id!),
    enabled: !!id
  });

export const useCreateMovement = (currentFilters: any) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: movementRepo.create,
    onMutate: async (payload: any) => {
      const key = qk.movements.list(currentFilters);
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<any[]>(key);
      const optimistic = { ...payload, id: `tmp-${Date.now()}` };
      qc.setQueryData(key, (old: any[] | undefined) => [
        optimistic,
        ...(old || [])
      ]);
      return { prev, key };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(ctx.key, ctx.prev);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.movements.all });
    }
  });
};

export const useUpdateMovement = (
  id: string,
  originalKind: "income" | "expense" | undefined,
  currentFilters: any
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: any) => {
      // Use the original kind if the new kind is not provided
      const effectiveKind = patch.kind || originalKind;
      return movementRepo.update(id, { ...patch, kind: effectiveKind });
    },
    onSuccess: (data) => {
      qc.setQueryData(qk.movements.byId(id), data);
      qc.invalidateQueries({ queryKey: qk.movements.list(currentFilters) });
    }
  });
};

export const useDeleteMovement = (currentFilters: any) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: movementRepo.remove,
    onMutate: async (id: string) => {
      const key = qk.movements.list(currentFilters);
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<any[]>(key);
      qc.setQueryData(key, (old: any[] | undefined) =>
        (old || []).filter((x) => x.id !== id)
      );
      return { prev, key };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(ctx.key, ctx.prev);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.movements.all });
    }
  });
};
