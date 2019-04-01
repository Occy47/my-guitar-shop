import { combineReducers } from "redux";
import itemsReducer from "./item";

const rootReducer = combineReducers({
  items: itemsReducer
});

export default rootReducer;
