import { useMemo } from "react";
import MovementsOutput from "../components/Movements/MovementsOutput";
import { useMovements } from "@/features/movement/hooks";

export default function Movements() {
  const { data: movements = [] } = useMovements({});

  const total = useMemo(() => {
    return movements.reduce((sum, m) => {
      const amount = m.kind === "income" ? m.value : -m.value;
      return sum + amount;
    }, 0);
  }, [movements]);

  return (
    <MovementsOutput
      movements={movements}
      movementsTotal={total}
      movementsPeriod="Total"
      fallBackText="No hay movimientos registrados"
    />
  );
}
