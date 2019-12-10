import { ITEMS_ADD, ITEMS_DELETE, ITEMS_UPDATE, ITEMS_SET } from "../constants";
import { ItemsActions } from "../types";

export type Item = {
  id: string;
  category: string;
  make: string;
  model: string;
  price: number;
  description: string;
  thumbUrl: string;
  images: object;
};

export interface ItemsState {
  items: Item[];
}

const INITIAL_STATE: ItemsState = {
  items: []
};

function applyAddItem(state: ItemsState, action: ItemsActions) {
  let item = action.payload;
  let items = [...state.items, item];
  return { ...state, items };
}

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

function applySetItems(state: ItemsState, action: ItemsActions) {
  let items = action.payload;
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
    case ITEMS_SET:
      return applySetItems(state, action);
    default:
      return state;
  }
}

export default itemsReducer;
