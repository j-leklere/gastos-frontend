import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SummaryHeader from "../components/SummaryHeader";
import CategoryCard from "../components/Categories/CategoryCard";
import { ScrollView } from "react-native";

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

export default function Home() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#111828", "#171E2D"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientContainer}
      >
        <SummaryHeader />
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
      </LinearGradient>
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
