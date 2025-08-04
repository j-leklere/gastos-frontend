import MovementsOutput from "../components/Movements/MovementsOutput";

export default function Recents() {
  return <MovementsOutput MovementsTotal={10} MovementsPeriod="Last 7 days" />;
}
