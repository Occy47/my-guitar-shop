import { createStore, Store } from "redux";
import rootReducer from "../reducers/index";
import { ItemsState } from "../reducers/item";

const store: Store<ItemsState> = createStore(rootReducer);

export default store;
