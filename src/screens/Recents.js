import { useContext } from "react";
import MovementsOutput from "../components/Movements/MovementsOutput";
import { MovementsContext } from "../store/movements-context";
import { getDateMinusDays } from "../util/date";
import { View } from "react-native";
import FloatingAddButton from "../components/UI/FloatingAddButton";

export default function Recents() {
  const movementsCtx = useContext(MovementsContext);

  const recentMovments = movementsCtx.movements.filter((movement) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return movement.date >= date7DaysAgo && movement.date <= today;
  });

  return (
    <View style={{ flex: 1 }}>
      <MovementsOutput
        movements={recentMovments}
        movementsTotal={10}
        movementsPeriod="Ultimos 7 days"
        fallBackText="No hay movimientos en los ultimos 7 dias"
      />
      <FloatingAddButton />
    </View>
  );
}
