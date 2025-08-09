import { FlatList, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SummaryHeader from "../components/SummaryHeader";
import CategoryCard from "../components/Categories/CategoryCard";
import { ScrollView } from "react-native";
import MovementsList from "../components/Movements/MovementsList";
import MovementItem from "../components/Movements/MovementItem";
import FloatingAddButton from "../components/UI/FloatingAddButton";

const CATEGORIES_SUMMARY_DTO_DATA = [
  {
    id: 1,
    name: "Comida",
    amount: 100000,
  },
  { id: 2, name: "Juntadas", amount: 215000 },
  { id: 3, name: "Transporte", amount: 45000 },
  { id: 4, name: "Ropa", amount: 40000 },
  { id: 5, name: "Estacionamiento", amount: 76000 },
];

const MOVEMENTS_LIST_DTO_DATA = [
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

function renderMovementItem(itemData) {
  return <MovementItem {...itemData.item} />;
}

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#111828", "#171E2D"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientContainer}
        >
          <SummaryHeader />
          <View style={{ height: 70 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsContainer}
            >
              {CATEGORIES_SUMMARY_DTO_DATA.map((cardData) => {
                return (
                  <CategoryCard
                    key={cardData.id}
                    name={cardData.name}
                    amount={cardData.amount}
                  />
                );
              })}
            </ScrollView>
          </View>
          <FlatList
            data={MOVEMENTS_LIST_DTO_DATA}
            renderItem={renderMovementItem}
            keyExtractor={(item) => item.id}
          />
        </LinearGradient>
      </View>
      <FloatingAddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    gap: 16,
    alignItems: "flex-start",
  },
  gradientContainer: {
    flex: 1,
    padding: 8,
    paddingTop: 12,
    gap: 24,
  },
});
