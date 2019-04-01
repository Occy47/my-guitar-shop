import { ITEMS_ADD } from "../constants";
import { action } from "typesafe-actions";
import { Item } from "../reducers/item";

export const doAddItem = (item: Item) => action(ITEMS_ADD, item);
