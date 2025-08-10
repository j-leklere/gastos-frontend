import { useContext } from "react";
import MovementsOutput from "../components/Movements/MovementsOutput";
import { MovementsContext } from "../store/movements-context";
import { View } from "react-native";
import FloatingAddButton from "../components/UI/FloatingAddButton";

export default function Movements() {
  const movementsCtx = useContext(MovementsContext);

  return (
    <View style={{ flex: 1 }}>
      <MovementsOutput
        movements={movementsCtx.movements}
        movementsTotal={10}
        movementsPeriod="Total"
        fallBackText="No hay movimientos registrados"
      />
      <FloatingAddButton />
    </View>
  );
}
