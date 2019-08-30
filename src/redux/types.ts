import {
  ITEMS_ADD,
  ITEMS_DELETE,
  ITEMS_UPDATE,
  SORTER_SET,
  USERS_SET,
  ITEMS_SET,
  ADD_ITEM_TO_CART
} from "./constants";
import { Item, ItemsState } from "../redux/reducers/item";

import { StateType } from "typesafe-actions";
import rootReducer from "../redux/reducers";
import { User } from "../redux/reducers/user";

interface SetItemsAction {
  type: typeof ITEMS_SET;
  payload: any;
}

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

interface SetUsersAction {
  type: typeof USERS_SET;
  payload: User[];
}

interface AddItemToCartAction {
  type: typeof ADD_ITEM_TO_CART;
  payload: any;
}

export type RootState = StateType<typeof rootReducer>;
export type ItemsActions =
  | SetItemsAction
  | AddItemAction
  | DeleteItemAction
  | UpdateItemAction;
export type SorterActions = SortItemsAction;
export type UsersActions = SetUsersAction;
export type CartItemsActions = AddItemToCartAction;
