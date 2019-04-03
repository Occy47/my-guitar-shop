import { ITEMS_ADD } from "../constants";
import * as actions from "../actions/item";
import { ActionType } from "typesafe-actions";

export type Item = {
  name: string;
  price: number;
  description: string;
};

export interface ItemsState {
  items: Item[];
}

const INITIAL_STATE: ItemsState = {
  items: [
    { name: "fender", price: 3300, description: "cool guitar" },
    { name: "gibson", price: 4200, description: "the coolest guitar" }
  ]
};

export type ItemsActions = ActionType<typeof actions>;

function applyAddItem(state: ItemsState, action: ItemsActions) {
  const item = { ...action.payload };
  const items = [...state.items, item];
  return { ...state, items };
}

function itemsReducer(state = INITIAL_STATE, action: ItemsActions): ItemsState {
  switch (action.type) {
    case ITEMS_ADD:
      return applyAddItem(state, action);
    default:
      return state;
  }
}

export default itemsReducer;
