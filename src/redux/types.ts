import {
  ITEMS_ADD,
  ITEMS_DELETE,
  ITEMS_UPDATE,
  FILTER_SET,
  USERS_SET,
  ITEMS_SET,
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  EMPTY_CART,
  REMOVE_ALERT,
  SORT_BY
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

interface FilterItemsAction {
  type: typeof FILTER_SET;
  payload: string;
}

interface SortItemsAction {
  type: typeof SORT_BY;
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

interface DeleteItemFromCart {
  type: typeof DELETE_ITEM_FROM_CART;
  payload: any;
}

interface EmptyUserCart {
  type: typeof EMPTY_CART;
  payload?: any;
}

interface RemoveAlert {
  type: typeof REMOVE_ALERT;
  payload: any;
}

export type RootState = StateType<typeof rootReducer>;
export type ItemsActions =
  | SetItemsAction
  | AddItemAction
  | DeleteItemAction
  | UpdateItemAction;
export type FilterActions = FilterItemsAction;
export type SortByActions = SortItemsAction;
export type UsersActions = SetUsersAction;
export type CartItemsActions =
  | AddItemToCartAction
  | DeleteItemFromCart
  | EmptyUserCart;
export type AlertsActions = RemoveAlert;
