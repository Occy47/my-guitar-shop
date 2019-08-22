import { createStore, Store, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers/index";

const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
