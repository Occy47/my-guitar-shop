import { ITEMS_ADD } from "../constants";
import { combineReducers } from "redux";

export type Item = {
  name: string;
  price: number;
  description: string;
};

export type ItemState = {
  items: Item[];
  error: string;
};

const INITIAL_STATE: ItemState = {
  items: [],
  error: ""
};

// function applyAddItem(state: ItemState, action: ItemActionTypes) {
//   const newItem = action.payload;
//   const error = "";
//   return { ...state, newItem, error };
// }

// function itemReducer(
//   state = INITIAL_STATE,
//   action: ItemActionTypes
// ): ItemState {
//   switch (action.type) {
//     case ITEMS_ADD: {
//       return applyAddItem(state, action);
//     }
//     default:
//       return state;
//   }
// }

export default itemReducer;
