import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import LinearGradientContainer from "./UI/LinearGradientContainer";

type Props = {
  total?: number;
  uncategorizedCount?: number;
};

export default function SummaryHeader({
  total = 0,
  uncategorizedCount = 0
}: Props) {
  const isPositive = total >= 0;
  const totalColor = isPositive ? "#10b981" : "#ef4444";
  const formattedTotal = Math.abs(total).toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <View>
      <LinearGradientContainer>
        <View style={styles.content}>
          <Text
            style={[
              GlobalStyles.textBase,
              GlobalStyles.bigText,
              GlobalStyles.tinyMarginBottom
            ]}
          >
            Buenos días Joaquin
          </Text>
          <Text
            style={[
              GlobalStyles.textBase,
              GlobalStyles.smallText,
              GlobalStyles.hugeMarginBottom
            ]}
          >
            {uncategorizedCount > 0
              ? `Tienes ${uncategorizedCount} gastos pendientes de categorizar`
              : "Todos tus gastos están categorizados"}
          </Text>
          <Text
            style={[
              GlobalStyles.textBase,
              GlobalStyles.bigText,
              { color: totalColor }
            ]}
          >
            {isPositive ? "+" : "-"}${formattedTotal}
          </Text>
        </View>
      </LinearGradientContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 10
  }
});
