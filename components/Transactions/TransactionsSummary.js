import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function TransactionsSummary({ total, periodName }) {
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.total}>${total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.backgrounds.primary,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    fontWeight: 500,
    color: GlobalStyles.colors.primary,
  },
  total: {
    fontSize: 16,
    fontWeight: 700,
    color: GlobalStyles.colors.accent,
  },
});
