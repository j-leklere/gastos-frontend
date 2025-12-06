import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { ensureMovementById } from "@/features/movement/prefetch";

type RootStackParamList = {
  ManageMovement: { movementId: string | number };
};

type Props = {
  id: string | number;
  description: string;
  date: Date;
  amount: number;
  kind?: "income" | "expense";
};

export default function MovementItem({
  id,
  description,
  date,
  amount,
  kind = "expense"
}: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function movementPressedHandler() {
    const movementId = String(id);

    ensureMovementById(movementId, kind).then(() => {
      navigation.navigate("ManageMovement", { movementId });
    });
  }

  const isIncome = kind === "income";
  const sign = isIncome ? "+" : "-";
  const amountColor = isIncome ? "#10b981" : "#ef4444";
  const borderColor = isIncome ? "#059669" : "#dc2626";

  return (
    <Pressable
      onPress={movementPressedHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.movement, { borderLeftColor: borderColor }]}>
        <View style={styles.leftContent}>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={[styles.amountContainer, { backgroundColor: amountColor }]}>
          <Text style={styles.amount}>
            {sign} ${amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  movement: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.backgrounds.primary,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4
  },
  leftContent: {
    flex: 1
  },
  textBase: { color: "white" },
  description: { fontSize: 16, marginBottom: 4, fontWeight: "900" },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    minWidth: 90
  },
  amount: { color: "white", fontWeight: "900", fontSize: 14 }
});
