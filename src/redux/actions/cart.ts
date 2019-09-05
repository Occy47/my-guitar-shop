import {
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  EMPTY_CART
} from "../constants";
import { action } from "typesafe-actions";

export const doAddItemToCart = (cartItems: any) =>
  action(ADD_ITEM_TO_CART, cartItems);

export const doDeleteItemFromCart = (id: any) =>
  action(DELETE_ITEM_FROM_CART, id);

export const doEmptyCart = () => action(EMPTY_CART);
