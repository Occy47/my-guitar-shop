import { ITEMS_ADD, ITEMS_DELETE, ITEMS_UPDATE } from "../constants";
import { action } from "typesafe-actions";
import { Item } from "../reducers/item";
import { ItemsActions } from "../types";

export const doAddItem = (item: Item): ItemsActions => action(ITEMS_ADD, item);
export const doDeleteItem = (item: Item): ItemsActions =>
  action(ITEMS_DELETE, item);
export const doUpdateItem = (item: Item): ItemsActions =>
  action(ITEMS_UPDATE, item);
