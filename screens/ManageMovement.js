import { useLayoutEffect } from "react";
import { Text } from "react-native";

export default function ManageMovement({ route, navigation }) {
  const editedMovementId = route.params?.MovementId;
  const isEditing = !!editedMovementId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar Movimiento" : "Agregar Movimiento",
    });
  }, [navigation, isEditing]);

  return <Text>Movimiento</Text>;
}
