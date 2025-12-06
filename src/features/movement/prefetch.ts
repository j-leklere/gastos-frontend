import { queryClient } from "../../../src/core/queryClient";
import { qk } from "../../../src/core/queryKeys";
import { movementRepo } from "../../../src/data/movement/MovementHttpRepository";

export const ensureMovementById = async (
  id: string,
  kind?: "income" | "expense"
) => {
  // Invalidate the query first to ensure fresh data
  await queryClient.invalidateQueries({ queryKey: qk.movements.byId(id) });

  // Then fetch the data with the correct kind
  return queryClient.fetchQuery({
    queryKey: qk.movements.byId(id),
    queryFn: () => movementRepo.getById(id, kind)
  });
};
