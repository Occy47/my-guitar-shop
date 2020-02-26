import { SORT_BY } from "../constants";

function applySortBy(state: string, action: any) {
  return action.payload;
}

function sortReducer(state: string = "AVAILABILITY", action: any) {
  switch (action.type) {
    case SORT_BY:
      return applySortBy(state, action);
    default:
      return state;
  }
}

export default sortReducer;
