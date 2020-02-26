import { RootState } from "../types";
import { Item } from "../reducers/item";

const CATEGORY_FILTERS: any = {
  SHOW_GUITARS: (item: Item) => item.category === "guitars",
  SHOW_AMPS: (item: Item) => item.category === "amps",
  SHOW_OTHER: (item: Item) => item.category === "other",
  SHOW_ALL: (item: Item) => true
};

const SORT_BY_SORTER: any = {
  AVAILABILITY: () => 0,
  SORT_BY_MAKE: (a: any, b: any) => {
    if (a.make < b.make) return -1;
    if (a.make > b.make) return 1;
    return 0;
  }
  // AVAILABILITY: (item: any) => item,
  /*   SORT_BY_MAKE: (a: any, b: any) => {
    if (a.make < b.make) return -1;
    if (a.make > b.make) return 1;
    return 0;
  }, */
  /*   AVAILABILITY() {
    return 0;
  },
  SORT_BY_MAKE(a: any, b: any) {
    if (a.make < b.make) {
      return -1;
    }
    if (a.make > b.make) {
      return 1;
    }
    return 0;
  } */
};

function getFilteredItems(state: RootState, sortItems: Function) {
  const filteredItems = state.itemsState.items.filter(
    CATEGORY_FILTERS[state.filterState]
  );
  return sortItems(filteredItems);
}

function getSortByItems(state: RootState) {
  return state.itemsState.items.slice().sort(SORT_BY_SORTER[state.sortState]);
}

export { getFilteredItems, getSortByItems };
