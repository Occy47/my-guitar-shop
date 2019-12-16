import { combineReducers } from "redux";
import itemsReducer from "./item";
import filterReducer from "./filter";
import userReducer from "./user";
import cartReducer from "./cart";
import alertsReducer from "./alerts";

const rootReducer = combineReducers({
  itemsState: itemsReducer,
  filterState: filterReducer,
  userState: userReducer,
  cartState: cartReducer,
  alertsState: alertsReducer
});

export default rootReducer;
