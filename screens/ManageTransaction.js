import { useLayoutEffect } from "react";
import { Text } from "react-native";

export default function ManageTransaction({ route, navigation }) {
  const editedTransactionId = route.params?.transactionId;
  const isEditing = !!editedTransactionId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar Transaccion" : "Agregar Transaccion",
    });
  }, [navigation, isEditing]);

  return <Text>Transaccion</Text>;
}
