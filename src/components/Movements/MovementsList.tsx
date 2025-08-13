import { FlatList, ListRenderItemInfo } from "react-native";
import MovementItem from "./MovementItem";

export type MovementListItem = {
  id: string | number;
  type: "EGRESO" | "INGRESO";
  description: string;
  amount: number;
  date: Date;
};

type Props = {
  movements: MovementListItem[];
};

function renderMovementItem({ item }: ListRenderItemInfo<MovementListItem>) {
  return <MovementItem {...item} />;
}

export default function MovementsList({ movements }: Props) {
  return (
    <FlatList
      data={movements}
      renderItem={renderMovementItem}
      keyExtractor={(item) => String(item.id)}
    />
  );
}
