import { RootState } from "../types";
import { Item } from "../reducers/item";

const CATEGORY_FILTERS: any = {
  SHOW_GUITARS: (item: Item) => item.category === "guitars",
  SHOW_AMPS: (item: Item) => item.category === "amps",
  SHOW_OTHER: (item: Item) => item.category === "other",
  SHOW_ALL: (item: Item) => true
};

function getFilteredItems(state: RootState) {
  return state.itemsState.items.filter(CATEGORY_FILTERS[state.filterState]);
}

export default getFilteredItems;
