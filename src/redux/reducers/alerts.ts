import { ADD_ITEM_TO_CART, REMOVE_ALERT } from "../constants";

const INITIAL_STATE: any = {
  alerts: []
};

function applySetAlertAboutAddItemToCart(state: any, action: any) {
  let item = action.payload;
  let alert = {
    id: item.id,
    status: true,
    message: item.model + " added to Cart"
  };
  let alerts = [...state.alerts, alert];
  return { ...state, alerts };
}

function applyRemoveAlert(state: any, action: any) {
  let id = action.payload;
  const alerts = state.alerts.filter((alert: any) => alert.id !== id);
  return { ...state, alerts };
}

function alertsReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return applySetAlertAboutAddItemToCart(state, action);
    case REMOVE_ALERT:
      return applyRemoveAlert(state, action);
    default:
      return state;
  }
}

export default alertsReducer;
