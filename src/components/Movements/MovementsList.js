import { FlatList } from "react-native";
import MovementItem from "./MovementItem";

function renderMovementItem(itemData) {
  return <MovementItem {...itemData.item} />;
}

export default function MovementsList({ movements }) {
  return (
    <FlatList
      data={movements}
      renderItem={renderMovementItem}
      keyExtractor={(item) => item.id}
    />
  );
}
