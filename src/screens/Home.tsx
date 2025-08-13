import {
  FlatList,
  StyleSheet,
  View,
  ListRenderItemInfo,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SummaryHeader from "../components/SummaryHeader";
import CategoryCard from "../components/Categories/CategoryCard";
import MovementItem from "../components/Movements/MovementItem";
import FloatingAddButton from "../components/UI/FloatingAddButton";

type CategorySummary = { id: number; name: string; amount: number };
type MovementListItem = {
  id: number;
  type: "EGRESO" | "INGRESO";
  description: string;
  amount: number;
  date: Date;
};

const CATEGORIES_SUMMARY_DTO_DATA: CategorySummary[] = [
  { id: 1, name: "Comida", amount: 100000 },
  { id: 2, name: "Juntadas", amount: 215000 },
  { id: 3, name: "Transporte", amount: 45000 },
  { id: 4, name: "Ropa", amount: 40000 },
  { id: 5, name: "Estacionamiento", amount: 76000 }
];

const MOVEMENTS_LIST_DTO_DATA: MovementListItem[] = [
  {
    id: 1,
    type: "EGRESO",
    description: "Compras",
    amount: 45.67,
    date: new Date("2025-07-20")
  },
  {
    id: 2,
    type: "EGRESO",
    description: "Electricidad",
    amount: 75.32,
    date: new Date("2025-07-18")
  },
  {
    id: 3,
    type: "EGRESO",
    description: "Caffe",
    amount: 3.5,
    date: new Date("2025-07-19")
  },
  {
    id: 4,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17")
  },
  {
    id: 5,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16")
  },
  {
    id: 6,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17")
  },
  {
    id: 7,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16")
  },
  {
    id: 8,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17")
  },
  {
    id: 9,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16")
  },
  {
    id: 10,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17")
  },
  {
    id: 11,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16")
  },
  {
    id: 12,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17")
  },
  {
    id: 13,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16")
  }
];

function renderMovementItem({ item }: ListRenderItemInfo<MovementListItem>) {
  return <MovementItem {...item} />;
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
              {CATEGORIES_SUMMARY_DTO_DATA.map((card) => (
                <CategoryCard
                  key={card.id}
                  name={card.name}
                  amount={card.amount}
                />
              ))}
            </ScrollView>
          </View>
          <FlatList
            data={MOVEMENTS_LIST_DTO_DATA}
            renderItem={renderMovementItem}
            keyExtractor={(item) => String(item.id)}
          />
        </LinearGradient>
      </View>
      <FloatingAddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cardsContainer: { gap: 16, alignItems: "flex-start" },
  gradientContainer: { flex: 1, padding: 8, paddingTop: 12, gap: 24 }
});
