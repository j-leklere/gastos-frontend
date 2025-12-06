import { useMemo } from "react";
import MovementsOutput from "../components/Movements/MovementsOutput";
import { useMovements } from "@/features/movement/hooks";
import { getDateMinusDays } from "../util/date";

export default function Recents() {
  const { data: allMovements = [] } = useMovements({});

  const recentMovements = useMemo(() => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return allMovements.filter(
      (movement) => movement.date >= date7DaysAgo && movement.date <= today
    );
  }, [allMovements]);

  const total = useMemo(() => {
    return recentMovements.reduce((sum, m) => {
      const amount = m.kind === "income" ? m.value : -m.value;
      return sum + amount;
    }, 0);
  }, [recentMovements]);

  return (
    <MovementsOutput
      movements={recentMovements}
      movementsTotal={total}
      movementsPeriod="Últimos 7 días"
      fallBackText="No hay movimientos en los últimos 7 días"
    />
  );
}
