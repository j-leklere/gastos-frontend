import { FlatList, Text } from "react-native";
import MovementItem from "./MovementItem";

function renderMovementItem(itemData) {
  return <MovementItem {...itemData.item} />;
}

export default function MovementsList({ Movements }) {
  return (
    <FlatList
      data={Movements}
      renderItem={renderMovementItem}
      keyExtractor={(item) => item.id}
    />
  );
}
