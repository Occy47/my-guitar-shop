import { combineReducers } from "redux";
import itemsReducer from "./item";

const rootReducer = combineReducers({
  itemsState: itemsReducer
});

export default rootReducer;
