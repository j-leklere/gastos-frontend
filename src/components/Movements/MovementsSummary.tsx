import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

type Props = {
  total: number;
  periodName: string;
};

export default function MovementsSummary({ total, periodName }: Props) {
  const isPositive = total >= 0;
  const totalColor = isPositive ? "#10b981" : "#ef4444";
  const formattedTotal = Math.abs(total).toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.period}>{periodName}</Text>
        <Text style={[styles.total, { color: totalColor }]}>
          {isPositive ? "+" : "-"}${formattedTotal}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: GlobalStyles.backgrounds.primary,
    borderRadius: 8
  },
  period: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
    marginBottom: 8
  },
  total: {
    fontSize: 32,
    fontWeight: "900"
  }
});
