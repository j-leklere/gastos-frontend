import { createContext, useReducer, ReactNode } from "react";

export type MovementType = "EGRESO" | "INGRESO";

export type Movement = {
  id: string;
  type: MovementType;
  description: string;
  amount: number;
  date: Date;
};

type MovementsState = Movement[];

type AddPayload = {
  type: MovementType;
  description: string;
  amount: number;
  date: Date;
};

type UpdatePayload = { id: string; data: Partial<Omit<Movement, "id">> };

type Action =
  | { type: "ADD"; payload: AddPayload }
  | { type: "UPDATE"; payload: UpdatePayload }
  | { type: "DELETE"; payload: string };

const MOVEMENTS_LIST_DTO_DATA: MovementsState = [
  {
    id: "1",
    type: "EGRESO",
    description: "Compras",
    amount: 45.67,
    date: new Date("2025-08-04")
  },
  {
    id: "2",
    type: "EGRESO",
    description: "Electricidad",
    amount: 75.32,
    date: new Date("2025-07-18")
  },
  {
    id: "3",
    type: "EGRESO",
    description: "Caffe",
    amount: 3.5,
    date: new Date("2025-07-19")
  },
  {
    id: "4",
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500,
    date: new Date("2025-07-17")
  },
  {
    id: "5",
    type: "EGRESO",
    description: "Pelicula",
    amount: 27,
    date: new Date("2025-07-16")
  },
  {
    id: "6",
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500,
    date: new Date("2025-07-17")
  },
  {
    id: "7",
    type: "EGRESO",
    description: "Pelicula",
    amount: 27,
    date: new Date("2025-07-16")
  },
  {
    id: "8",
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500,
    date: new Date("2025-07-17")
  },
  {
    id: "9",
    type: "EGRESO",
    description: "Pelicula",
    amount: 27,
    date: new Date("2025-07-16")
  },
  {
    id: "10",
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500,
    date: new Date("2025-07-17")
  },
  {
    id: "11",
    type: "EGRESO",
    description: "Pelicula",
    amount: 27,
    date: new Date("2025-07-16")
  },
  {
    id: "12",
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500,
    date: new Date("2025-07-17")
  },
  {
    id: "13",
    type: "EGRESO",
    description: "Pelicula",
    amount: 27,
    date: new Date("2025-07-16")
  }
];

export type MovementsContextType = {
  movements: MovementsState;
  addMovement: (data: AddPayload) => void;
  deleteMovement: (id: string) => void;
  updateMovement: (id: string, data: Partial<Omit<Movement, "id">>) => void;
};

export const MovementsContext = createContext<MovementsContextType>({
  movements: [] as MovementsState,
  addMovement: () => {},
  deleteMovement: () => {},
  updateMovement: () => {}
});

function movementsReducer(
  state: MovementsState,
  action: Action
): MovementsState {
  switch (action.type) {
    case "ADD": {
      const id = new Date().toString + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    }
    case "UPDATE": {
      const updatableMovementIndex = state.findIndex(
        (movement) => movement.id === action.payload.id
      );
      const updatableMovement = state[updatableMovementIndex];
      const updatedMovement = { ...updatableMovement, ...action.payload.data };
      const updatedMovements = [...state];
      updatedMovements[updatableMovementIndex] = updatedMovement as Movement;
      return updatedMovements;
    }
    case "DELETE":
      return state.filter((movement) => movement.id !== action.payload);
    default:
      return state;
  }
}

export default function MovementsContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [movementsState, dispatch] = useReducer(
    movementsReducer,
    MOVEMENTS_LIST_DTO_DATA
  );

  function addMovement(movementData: AddPayload) {
    dispatch({ type: "ADD", payload: movementData });
  }

  function deleteMovement(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateMovement(
    id: string,
    movementData: Partial<Omit<Movement, "id">>
  ) {
    dispatch({ type: "UPDATE", payload: { id, data: movementData } });
  }

  const value: MovementsContextType = {
    movements: movementsState,
    addMovement,
    deleteMovement,
    updateMovement
  };

  return (
    <MovementsContext.Provider value={value}>
      {children}
    </MovementsContext.Provider>
  );
}
