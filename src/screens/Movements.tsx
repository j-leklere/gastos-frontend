import { useContext } from "react";
import { View } from "react-native";
import MovementsOutput from "../components/Movements/MovementsOutput";
import {
  MovementsContext,
  MovementsContextType
} from "../store/movements-context";

export default function Movements() {
  const movementsCtx = useContext<MovementsContextType>(MovementsContext);

  return (
    <View style={{ flex: 1 }}>
      <MovementsOutput
        movements={movementsCtx.movements}
        movementsTotal={10}
        movementsPeriod="Total"
        fallBackText="No hay movimientos registrados"
      />
    </View>
  );
}
