import { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  useMovement,
  useCreateMovement,
  useUpdateMovement,
  useDeleteMovement
} from "@/features/movement/hooks";

type AppStackParamList = {
  ManageMovement: { movementId?: string };
};

type Props = NativeStackScreenProps<AppStackParamList, "ManageMovement">;

export default function ManageMovement({ route, navigation }: Props) {
  const editedMovementId = route.params?.movementId;
  const isEditing = !!editedMovementId;

  const { data: movement, isLoading } = useMovement(editedMovementId);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [iso, setIso] = useState<"ARS" | "USD">("ARS");
  const [kind, setKind] = useState<"income" | "expense">("expense");

  const createMutation = useCreateMovement({});
  const updateMutation = useUpdateMovement(
    editedMovementId || "",
    movement?.kind,
    {}
  );
  const deleteMutation = useDeleteMovement({});

  useEffect(() => {
    if (movement) {
      setTitle(movement.title);
      setValue(movement.value.toString());
      setIso(movement.iso);
      setKind(movement.kind);
    }
  }, [movement]);

  function deleteMovementHandler() {
    if (editedMovementId) {
      deleteMutation.mutate(editedMovementId, {
        onSuccess: () => navigation.goBack()
      });
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    const numericValue = parseFloat(value);

    if (!title.trim() || isNaN(numericValue) || numericValue <= 0) {
      return;
    }

    const payload = {
      title: title.trim(),
      value: numericValue,
      iso,
      kind,
      date: new Date()
    };

    if (isEditing && updateMutation) {
      updateMutation.mutate(payload, {
        onSuccess: () => navigation.goBack()
      });
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => navigation.goBack()
      });
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Editar Movimiento" : "Agregar Movimiento"
    });
  }, [navigation, isEditing]);

  if (isLoading && isEditing) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Compras del supermercado"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Monto</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="0.00"
          placeholderTextColor="#888"
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Moneda</Text>
        <View style={styles.currencyContainer}>
          <TouchableOpacity
            style={[styles.currencyButton, iso === "ARS" && styles.selected]}
            onPress={() => setIso("ARS")}
          >
            <Text
              style={[
                styles.currencyText,
                iso === "ARS" && styles.selectedText
              ]}
            >
              ARS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.currencyButton, iso === "USD" && styles.selected]}
            onPress={() => setIso("USD")}
          >
            <Text
              style={[
                styles.currencyText,
                iso === "USD" && styles.selectedText
              ]}
            >
              USD
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Tipo</Text>
        <View style={styles.currencyContainer}>
          <TouchableOpacity
            style={[
              styles.currencyButton,
              kind === "expense" && styles.selected
            ]}
            onPress={() => setKind("expense")}
          >
            <Text
              style={[
                styles.currencyText,
                kind === "expense" && styles.selectedText
              ]}
            >
              Gasto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.currencyButton,
              kind === "income" && styles.selected
            ]}
            onPress={() => setKind("income")}
          >
            <Text
              style={[
                styles.currencyText,
                kind === "income" && styles.selectedText
              ]}
            >
              Ingreso
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
  formContainer: {
    marginBottom: 24
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    color: "white",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },
  currencyContainer: {
    flexDirection: "row",
    gap: 12
  },
  currencyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center"
  },
  selected: {
    backgroundColor: GlobalStyles.colors.accent,
    borderColor: GlobalStyles.colors.accent
  },
  currencyText: {
    color: "#888",
    fontSize: 16,
    fontWeight: "600"
  },
  selectedText: {
    color: "white"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    gap: 12
  },
  button: {
    flex: 1
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.accent,
    alignItems: "center"
  },
  centered: {
    justifyContent: "center",
    alignItems: "center"
  }
});
