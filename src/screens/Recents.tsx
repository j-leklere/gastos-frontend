import { useContext } from "react";
import { View } from "react-native";
import MovementsOutput from "../components/Movements/MovementsOutput";
import {
  MovementsContext,
  MovementsContextType
} from "../store/movements-context";
import { getDateMinusDays } from "../util/date";
import FloatingAddButton from "../components/UI/FloatingAddButton";

export default function Recents() {
  const movementsCtx = useContext<MovementsContextType>(MovementsContext);

  const recentMovements = movementsCtx.movements.filter((movement) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return movement.date >= date7DaysAgo && movement.date <= today;
  });

  return (
    <View style={{ flex: 1 }}>
      <MovementsOutput
        movements={recentMovements}
        movementsTotal={10}
        movementsPeriod="Ultimos 7 days"
        fallBackText="No hay movimientos en los ultimos 7 dias"
      />
      <FloatingAddButton />
    </View>
  );
}
