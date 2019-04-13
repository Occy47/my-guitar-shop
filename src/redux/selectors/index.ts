import { RootState } from "../types";
import { Item } from "../reducers/item";

const SORT_FILTERS: any = {
  SHOW_GUITARS: (item: Item) => item.category === "guitars",
  SHOW_AMPS: (item: Item) => item.category === "amps",
  SHOW_OTHER: (item: Item) => item.category === "other",
  SHOW_ALL: (item: Item) => true
};

function getSortedItems(state: RootState) {
  return state.itemsState.items.filter(SORT_FILTERS[state.sortState]);
}

export default getSortedItems;
