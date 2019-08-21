import { ITEMS_ADD, ITEMS_DELETE, ITEMS_UPDATE, ITEMS_SET } from "../constants";
import { action } from "typesafe-actions";
import { Item, ItemsState } from "../reducers/item";
import { ItemsActions } from "../types";

export const doSetItems = (items: any): ItemsActions =>
  action(ITEMS_SET, items);
export const doAddItem = (item: Item): ItemsActions => action(ITEMS_ADD, item);
export const doDeleteItem = (item: Item): ItemsActions =>
  action(ITEMS_DELETE, item);
export const doUpdateItem = (item: Item): ItemsActions =>
  action(ITEMS_UPDATE, item);
