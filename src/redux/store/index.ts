import { createStore, Store, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
