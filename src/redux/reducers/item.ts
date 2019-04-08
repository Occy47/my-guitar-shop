import { ITEMS_ADD, ITEMS_DELETE } from "../constants";
import { ItemsActions } from "../types";

export type Item = {
  id: string;
  category: string;
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
      category: "guitars",
      name: "fender",
      price: 3300,
      description: "cool guitar"
    },
    {
      id: "1",
      category: "guitars",
      name: "gibson",
      price: 4200,
      description: "the coolest guitar"
    },
    {
      id: "2",
      category: "guitars",
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

function itemsReducer(state = INITIAL_STATE, action: ItemsActions) {
  switch (action.type) {
    case ITEMS_ADD:
      return applyAddItem(state, action);
    case ITEMS_DELETE:
      return applyDeleteItem(state, action);
    default:
      return state;
  }
}

export default itemsReducer;
