import { combineReducers } from "redux";
import itemsReducer from "./item";
import sortReducer from "./sort";

const rootReducer = combineReducers({
  itemsState: itemsReducer,
  sortState: sortReducer
});

export default rootReducer;
