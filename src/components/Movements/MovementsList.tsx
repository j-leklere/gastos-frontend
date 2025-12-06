import { FlatList, ListRenderItemInfo } from "react-native";
import MovementItem from "./MovementItem";
import { Movement } from "@/domain/movement/Movement";

export type MovementListItem = {
  id: string;
  type: "EGRESO" | "INGRESO";
  description: string;
  amount: number;
  date: Date;
};

type Props = {
  movements: Movement[] | MovementListItem[];
};

function isMovement(item: Movement | MovementListItem): item is Movement {
  return "kind" in item;
}

function renderMovementItem({
  item
}: ListRenderItemInfo<Movement | MovementListItem>) {
  if (isMovement(item)) {
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
