import { StyleSheet, View } from "react-native";
import MovementsSummary from "./MovementsSummary";
import MovementsList from "./MovementsList";
import { GlobalStyles } from "../../constants/styles";

const Movements_LIST_DTO_DATA = [
  {
    id: 1,
    type: "EGRESO",
    description: "Compras",
    amount: 45.67,
    date: new Date("2025-07-20"),
  },
  {
    id: 2,
    type: "EGRESO",
    description: "Electricidad",
    amount: 75.32,
    date: new Date("2025-07-18"),
  },
  {
    id: 3,
    type: "EGRESO",
    description: "Caffe",
    amount: 3.5,
    date: new Date("2025-07-19"),
  },
  {
    id: 4,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17"),
  },
  {
    id: 5,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16"),
  },
  {
    id: 6,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17"),
  },
  {
    id: 7,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16"),
  },
  {
    id: 8,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17"),
  },
  {
    id: 9,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16"),
  },
  {
    id: 10,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17"),
  },
  {
    id: 11,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16"),
  },
  {
    id: 12,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17"),
  },
  {
    id: 13,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16"),
  },
];

export default function MovementsOutput({ MovementsTotal, MovementsPeriod }) {
  return (
    <View style={styles.container}>
      <MovementsSummary total={MovementsTotal} periodName={MovementsPeriod} />
      <MovementsList Movements={Movements_LIST_DTO_DATA} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.backgrounds.secondary,
    gap: 10,
  },
});
