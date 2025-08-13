import { StyleSheet, Text, View } from "react-native";
import MovementsSummary from "./MovementsSummary";
import MovementsList, { MovementListItem } from "./MovementsList";
import { GlobalStyles } from "../../constants/styles";

type Props = {
  movements: MovementListItem[];
  movementsTotal: number;
  movementsPeriod: string;
  fallBackText: string;
};

export default function MovementsOutput({
  movements,
  movementsTotal,
  movementsPeriod,
  fallBackText
}: Props) {
  const content =
    movements.length > 0 ? (
      <MovementsList movements={movements} />
    ) : (
      <Text style={styles.infoText}>{fallBackText}</Text>
    );

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
