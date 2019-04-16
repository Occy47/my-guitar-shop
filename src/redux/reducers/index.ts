import { combineReducers } from "redux";
import itemsReducer from "./item";
import sortReducer from "./sort";
import userReducer from "./user";

const rootReducer = combineReducers({
  itemsState: itemsReducer,
  sortState: sortReducer,
  userState: userReducer
});

export default rootReducer;
