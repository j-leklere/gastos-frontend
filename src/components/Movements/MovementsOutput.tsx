import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MovementsSummary from "./MovementsSummary";
import MovementsList, { MovementListItem } from "./MovementsList";

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
    <LinearGradient
      colors={["#111828", "#171E2D"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <MovementsSummary total={movementsTotal} periodName={movementsPeriod} />
      {content}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 52,
    gap: 12
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24
  }
});
