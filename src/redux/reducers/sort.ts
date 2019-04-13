import { SORTER_SET } from "../constants";

function applySortFilter(state: any, action: any) {
  return action.payload;
}

function SortReducer(state: string = "SHOW_ALL", action: any) {
  switch (action.type) {
    case SORTER_SET:
      return applySortFilter(state, action);
    default:
      return state;
  }
}

export default SortReducer;
