import { ADD_ITEM_TO_CART } from "../constants";
import { Item } from "./item";
import { CartItemsActions } from "../types";

interface IcartState {
  userCart: Item[];
}

const INITIAL_STATE: IcartState = {
  userCart: []
};

function applyAddItemToCart(state: IcartState, action: CartItemsActions) {
  const item = action.payload;
  const userCart = [...state.userCart, item];
  return { ...state, userCart };
}

function cartReducer(state = INITIAL_STATE, action: CartItemsActions) {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      return applyAddItemToCart(state, action);
    }
    default:
      return state;
  }
}

export default cartReducer;
