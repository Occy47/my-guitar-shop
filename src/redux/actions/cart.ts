import { ADD_ITEM_TO_CART } from "../constants";
import { action } from "typesafe-actions";

export const doAddItemToCart = (cartItems: any) =>
  action(ADD_ITEM_TO_CART, cartItems);
