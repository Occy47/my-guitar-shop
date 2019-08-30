import { combineReducers } from "redux";
import itemsReducer from "./item";
import sortReducer from "./sort";
import userReducer from "./user";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  itemsState: itemsReducer,
  sortState: sortReducer,
  userState: userReducer,
  cartState: cartReducer
});

export default rootReducer;
