import {
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  EMPTY_CART
} from "../constants";
import { Item } from "./item";
import { CartItemsActions } from "../types";

interface IcartState {
  userCart: Item[];
  cartTotal: number;
}

const INITIAL_STATE: IcartState = {
  userCart: [],
  cartTotal: 0
};

function applyAddItemToCart(state: IcartState, action: CartItemsActions) {
  const item = action.payload;
  const userCart = [...state.userCart, item];
  const cartTotal = state.cartTotal + Number(action.payload.price);
  return { ...state, userCart, cartTotal };
}

function applyDeleteItemFromCart(state: IcartState, action: CartItemsActions) {
  const id = action.payload.id;
  const cartTotal = state.cartTotal - Number(action.payload.price);
  const userCart = state.userCart.filter((item: any) => item.id !== id);
  return { ...state, userCart, cartTotal };
}

function applyEmptyUserCart(state: IcartState, action: CartItemsActions) {
  const userCart: Item[] = [];
  const cartTotal = 0;
  return { ...state, userCart, cartTotal };
}

function cartReducer(state = INITIAL_STATE, action: CartItemsActions) {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      return applyAddItemToCart(state, action);
    }
    case DELETE_ITEM_FROM_CART: {
      return applyDeleteItemFromCart(state, action);
    }
    case EMPTY_CART: {
      return applyEmptyUserCart(state, action);
    }
    default:
      return state;
  }
}

export default cartReducer;
