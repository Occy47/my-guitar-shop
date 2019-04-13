import { ITEMS_ADD, ITEMS_DELETE, ITEMS_UPDATE } from "../constants";
import { ItemsActions } from "../types";

export type Item = {
  id: string;
  category: string;
  make: string;
  model: string;
  price: number;
  description: string;
};

export interface ItemsState {
  items: Item[];
}

const INITIAL_STATE: ItemsState = {
  items: [
    {
      id: "0",
      category: "guitars",
      make: "fender",
      model: "stratocaster",
      price: 3300,
      description: "cool guitar"
    },
    {
      id: "1",
      category: "guitars",
      make: "gibson",
      model: "les paul",
      price: 4200,
      description: "the coolest guitar"
    },
    {
      id: "2",
      category: "guitars",
      make: "gibson",
      model: "sg",
      price: 3800,
      description: "very nice guitar"
    },
    {
      id: "3",
      category: "guitars",
      make: "ltd",
      model: "les paul",
      price: 2800,
      description: "good, players guitar"
    },
    {
      id: "4",
      category: "guitars",
      make: "ltd",
      model: "stratocaster",
      price: 1900,
      description: "begginers guitar"
    },
    {
      id: "5",
      category: "amps",
      make: "fender",
      model: "amp 20w",
      price: 900,
      description: "good amp"
    },
    {
      id: "6",
      category: "amps",
      make: "marshall",
      model: "amp 80w",
      price: 2900,
      description: "very good amp"
    },
    {
      id: "7",
      category: "other",
      make: "fender",
      model: "2m cord",
      price: 35,
      description: "2m basic guitar cord"
    }
  ]
};

function applyAddItem(state: ItemsState, action: ItemsActions) {
  let item = action.payload;
  let items = [...state.items, item];
  return { ...state, items };
}

// itemState reducer => state type error if string is passed
function applyDeleteItem(state: ItemsState, action: ItemsActions) {
  let id = action.payload.id;
  let items = state.items.filter((item: Item) => item.id !== id);
  return { ...state, items };
}

function applyUpdateItem(state: ItemsState, action: ItemsActions) {
  let id = action.payload.id;
  let items = state.items.map((item: Item) => {
    if (item.id === id) return { ...item, ...action.payload };
    else return item;
  });

  return { ...state, items };
}

function itemsReducer(state = INITIAL_STATE, action: ItemsActions) {
  switch (action.type) {
    case ITEMS_ADD:
      return applyAddItem(state, action);
    case ITEMS_DELETE:
      return applyDeleteItem(state, action);
    case ITEMS_UPDATE:
      return applyUpdateItem(state, action);
    default:
      return state;
  }
}

export default itemsReducer;
