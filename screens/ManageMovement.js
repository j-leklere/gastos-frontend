import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { MovementsContext } from "../store/movements-context";

export default function ManageMovement({ route, navigation }) {
  const movementsCtx = useContext(MovementsContext);

  const editedMovementId = route.params?.movementId;
  const isEditing = !!editedMovementId;

  function deleteMovementHandler() {
    movementsCtx.deleteMovement(editedMovementId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  console.log(editedMovementId);

  function confirmHandler() {
    if (isEditing) {
      movementsCtx.updateMovement(editedMovementId, {
        description: "Test",
        amount: 999,
        date: new Date("2022-05-20")
      });
    } else {
      movementsCtx.addMovement({
        description: "Test",
        amount: 199.99,
        date: new Date("2022-05-20")
      });
    }
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar Movimiento" : "Agregar Movimiento"
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancelar
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Actualizar" : "Agregar"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color="red"
            size={36}
            onPress={deleteMovementHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.accent,
    alignItems: "center"
  }
});
