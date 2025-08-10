import { createContext, useReducer } from "react";

const MOVEMENTS_LIST_DTO_DATA = [
  {
    id: 1,
    type: "EGRESO",
    description: "Compras",
    amount: 45.67,
    date: new Date("2025-08-04")
  },
  {
    id: 2,
    type: "EGRESO",
    description: "Electricidad",
    amount: 75.32,
    date: new Date("2025-07-18")
  },
  {
    id: 3,
    type: "EGRESO",
    description: "Caffe",
    amount: 3.5,
    date: new Date("2025-07-19")
  },
  {
    id: 4,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17")
  },
  {
    id: 5,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16")
  },
  {
    id: 6,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17")
  },
  {
    id: 7,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16")
  },
  {
    id: 8,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17")
  },
  {
    id: 9,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16")
  },
  {
    id: 10,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17")
  },
  {
    id: 11,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16")
  },
  {
    id: 12,
    type: "INGRESO",
    description: "Sueldo",
    amount: 1500.0,
    date: new Date("2025-07-17")
  },
  {
    id: 13,
    type: "EGRESO",
    description: "Pelicula",
    amount: 27.0,
    date: new Date("2025-07-16")
  }
];

export const MovementsContext = createContext({
  movements: [],
  addMovement: ({ description, amount, date }) => {},
  deleteMovement: ({ id }) => {},
  updateMovement: (id, { description, amount, date }) => {}
});

function movementsReducer(state, action) {
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
      updatedMovements[updatableMovementIndex] = updatedMovement;
      return updatedMovements;
    }
    case "DELETE":
      return state.filter((movement) => movement.id !== action.payload);
    default:
      return state;
  }
}

export default function MovementsContextProvider({ children }) {
  const [movementsState, dispatch] = useReducer(
    movementsReducer,
    MOVEMENTS_LIST_DTO_DATA
  );

  function addMovement(movementData) {
    dispatch({ type: "ADD", payload: movementData });
  }

  function deleteMovement(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateMovement(id, movementData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: movementData } });
  }

  const value = {
    movements: movementsState,
    addMovement: addMovement,
    deleteMovement: deleteMovement,
    updateMovement: updateMovement
  };

  return (
    <MovementsContext.Provider value={value}>
      {children}
    </MovementsContext.Provider>
  );
}
