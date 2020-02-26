import { combineReducers } from "redux";
import itemsReducer from "./item";
import filterReducer from "./filter";
import userReducer from "./user";
import cartReducer from "./cart";
import alertsReducer from "./alerts";
import sortReducer from "./sort";

const rootReducer = combineReducers({
  itemsState: itemsReducer,
  filterState: filterReducer,
  userState: userReducer,
  cartState: cartReducer,
  alertsState: alertsReducer,
  sortState: sortReducer
});

export default rootReducer;
