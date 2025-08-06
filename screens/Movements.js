import { useContext } from "react";
import MovementsOutput from "../components/Movements/MovementsOutput";
import { MovementsContext } from "../store/movements-context";

export default function Movements() {
  const movementsCtx = useContext(MovementsContext);

  return (
    <MovementsOutput
      movements={movementsCtx.movements}
      movementsTotal={10}
      movementsPeriod="Total"
      fallBackText="No hay movimientos registrados"
    />
  );
}
