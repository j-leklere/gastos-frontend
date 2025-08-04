import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../constants/styles";
import LinearGradientContainer from "./UI/LinearGradientContainer";

export default function SummaryHeader() {
  return (
    <View style={styles.container}>
      <LinearGradientContainer>
        <View style={styles.content}>
          <Text
            style={[
              GlobalStyles.textBase,
              GlobalStyles.bigText,
              GlobalStyles.tinyMarginBottom,
            ]}
          >
            Buenos dias Joaquin
          </Text>
          <Text
            style={[
              GlobalStyles.textBase,
              GlobalStyles.smallText,
              GlobalStyles.hugeMarginBottom,
            ]}
          >
            Tienes 3 gastos pendientes de categorizar
          </Text>
          <Text style={[GlobalStyles.textBase, GlobalStyles.bigText]}>
            $12.760.000,50
          </Text>
        </View>
      </LinearGradientContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 24,
  },
  content: {
    padding: 10,
  },
  textBase: {
    color: "white",
    fontWeight: 700,
    fontSize: 16,
  },
});
