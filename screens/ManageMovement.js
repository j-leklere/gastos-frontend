import { useLayoutEffect } from "react";
import { Text } from "react-native";

export default function ManageMovement({ route, navigation }) {
  const editedMovementId = route.params?.MovementId;
  const isEditing = !!editedMovementId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar Transaccion" : "Agregar Transaccion",
    });
  }, [navigation, isEditing]);

  return <Text>Transaccion</Text>;
}
