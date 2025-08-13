import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

type RootStackParamList = {
  ManageMovement: { movementId: string | number } | undefined;
};

type Props = {
  id: string | number;
  description: string;
  date: Date;
  amount: number;
};

export default function MovementItem({ id, description, date, amount }: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function movementPressedHandler() {
    navigation.navigate("ManageMovement", { movementId: id });
  }

  return (
    <Pressable
      onPress={movementPressedHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.movement}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
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
    alignItems: "center"
  },
  textBase: { color: "white" },
  description: { fontSize: 16, marginBottom: 4, fontWeight: "900" },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80
  },
  amount: { color: GlobalStyles.colors.primary, fontWeight: "900" }
});
