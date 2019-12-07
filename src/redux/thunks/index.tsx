import { doAddItemToCart } from "../actions/cart";
import { doRemoveAlert } from "../actions/alerts";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../types";
import { Action } from "redux";

export function doAddItemToCartWithAlert(
  item: any,
  id: string
): ThunkAction<void, RootState, null, Action<any>> {
  return function(dispatch) {
    dispatch(doAddItemToCart(item));

    setTimeout(function() {
      dispatch(doRemoveAlert(id));
    }, 3000);
  };
}
