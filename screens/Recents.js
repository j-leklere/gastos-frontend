import TransactionsOutput from "../components/Transactions/TransactionsOutput";

export default function Recents() {
  return (
    <TransactionsOutput
      transactionsTotal={10}
      transactionsPeriod="Last 7 days"
    />
  );
}
