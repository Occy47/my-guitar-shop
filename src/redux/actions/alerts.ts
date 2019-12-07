import { action } from "typesafe-actions";
import { ADD_ITEM_TO_CART, REMOVE_ALERT } from "../constants";

export const doSetAlertAboutAddItemToCart = (item: any) =>
  action(ADD_ITEM_TO_CART, item);

export const doRemoveAlert = (id: any) => action(REMOVE_ALERT, id);
