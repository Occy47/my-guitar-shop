import { combineReducers } from "redux";
import itemReducer from "./item";

const rootReducer = combineReducers({
  itemState: itemReducer
});

export default rootReducer;
