import { FlatList, Text } from "react-native";
import TransactionItem from "./TransactionItem";

function renderTransactionItem(itemData) {
  return <TransactionItem {...itemData.item} />;
}

export default function TransactionsList({ transactions }) {
  return (
    <FlatList
      data={transactions}
      renderItem={renderTransactionItem}
      keyExtractor={(item) => item.id}
    />
  );
}
