import { FILTER_SET } from "../constants";

function applyFilter(state: string, action: any) {
  return action.payload;
}

function FilterReducer(state: string = "SHOW_ALL", action: any) {
  switch (action.type) {
    case FILTER_SET:
      return applyFilter(state, action);
    default:
      return state;
  }
}

export default FilterReducer;
