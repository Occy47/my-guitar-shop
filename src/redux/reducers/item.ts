import { ITEMS_ADD, ITEMS_DELETE, ITEMS_UPDATE } from "../constants";
import { ItemsActions } from "../types";

export type Item = {
  id: string;

  name: string;
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

      name: "fender",
      price: 3300,
      description: "cool guitar"
    },
    {
      id: "1",

      name: "gibson",
      price: 4200,
      description: "the coolest guitar"
    },
    {
      id: "2",

      name: "gibson",
      price: 3800,
      description: "very nice guitar"
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
