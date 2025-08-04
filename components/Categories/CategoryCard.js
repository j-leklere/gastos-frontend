import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function CategoryCard({ name, amount }) {
  return (
    <View style={styles.container}>
      <Text
        style={[
          GlobalStyles.textBase,
          GlobalStyles.smallText,
          GlobalStyles.smallMarginBottom,
        ]}
      >
        {name}
      </Text>
      <Text style={[GlobalStyles.textBase, GlobalStyles.bigText]}>
        ${amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#182130",
    padding: 16,
    borderRadius: 6,
    width: 140,
  },
});
