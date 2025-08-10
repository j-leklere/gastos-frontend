import { StyleSheet, Text, View } from "react-native";
import MovementsSummary from "./MovementsSummary";
import MovementsList from "./MovementsList";
import { GlobalStyles } from "../../constants/styles";

export default function MovementsOutput({
  movements,
  movementsTotal,
  movementsPeriod,
  fallBackText
}) {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (movements.length > 0) {
    content = <MovementsList movements={movements} />;
  }

  return (
    <View style={styles.container}>
      <MovementsSummary total={movementsTotal} periodName={movementsPeriod} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.backgrounds.secondary,
    gap: 10
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24
  }
});
