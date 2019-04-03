import { createStore, Store, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers/index";
import { ItemsState } from "../reducers/item";

const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
