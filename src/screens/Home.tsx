import {
  FlatList,
  StyleSheet,
  ListRenderItemInfo
} from "react-native";
import { useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import SummaryHeader from "../components/SummaryHeader";
import MovementItem from "../components/Movements/MovementItem";
import { useMovements } from "@/features/movement/hooks";
import { Movement } from "@/domain/movement/Movement";

function renderMovementItem({ item }: ListRenderItemInfo<Movement>) {
  return (
    <MovementItem
      id={item.id}
      description={item.title}
      amount={item.value}
      date={item.date}
      kind={item.kind}
    />
  );
}

export default function Home() {
  const { data: movements = [] } = useMovements({});

  const total = useMemo(() => {
    return movements.reduce((sum, m) => {
      const amount = m.kind === "income" ? m.value : -m.value;
      return sum + amount;
    }, 0);
  }, [movements]);

  const uncategorizedCount = useMemo(() => {
    return movements.filter((m) => !m.kind).length;
  }, [movements]);

  return (
    <LinearGradient
      colors={["#111828", "#171E2D"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SummaryHeader total={total} uncategorizedCount={uncategorizedCount} />
      <FlatList
        data={movements}
        renderItem={renderMovementItem}
        keyExtractor={(item) => item.id}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8, paddingTop: 52, gap: 24 }
});
