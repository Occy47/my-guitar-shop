import { ITEMS_ADD, ITEMS_DELETE, ITEMS_UPDATE, SORTER_SET } from "./constants";
import { Item } from "../redux/reducers/item";

import { StateType } from "typesafe-actions";
import rootReducer from "../redux/reducers";

interface AddItemAction {
  type: typeof ITEMS_ADD;
  payload: Item;
}

interface DeleteItemAction {
  type: typeof ITEMS_DELETE;
  payload: Item;
}

interface UpdateItemAction {
  type: typeof ITEMS_UPDATE;
  payload: Item;
}

interface SortItemsAction {
  type: typeof SORTER_SET;
  payload: string;
}

//if payload is not Item => error ??

export type RootState = StateType<typeof rootReducer>;
export type ItemsActions = AddItemAction | DeleteItemAction | UpdateItemAction;
export type SorterActions = SortItemsAction;
