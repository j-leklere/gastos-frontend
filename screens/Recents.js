import MovementsOutput from "../components/Movements/MovementsOutput";

export default function Recents() {
  return <MovementsOutput movementsTotal={10} movementsPeriod="Last 7 days" />;
}
