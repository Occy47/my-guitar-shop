import { RootState } from "../types";
import { Item } from "../reducers/item";
import { stat } from "fs";

const CATEGORY_FILTERS: any = {
  SHOW_GUITARS: (item: Item) => item.category === "guitars",
  SHOW_AMPS: (item: Item) => item.category === "amps",
  SHOW_OTHER: (item: Item) => item.category === "other",
  SHOW_ALL: (item: Item) => true,
};

const SORT_BY_SORTER: any = {
  AVAILABILITY: () => 0,
  SORT_BY_MAKE: (a: any, b: any) => {
    if (a.make < b.make) return -1;
    if (a.make > b.make) return 1;
    return 0;
  },
  SORT_BY_PRICE: (a: any, b: any) => {
    return a.price - b.price;
  },
};

function getPaginatedSortedAndFilteredItems(state: RootState) {
  const filteredItems = state.itemsState.items.filter(
    CATEGORY_FILTERS[state.filterState]
  );
  const sortedAndFiltered = filteredItems
    .slice()
    .sort(SORT_BY_SORTER[state.sortState]);

  const paginatedSortedAndFiltered = sortedAndFiltered.slice(
    state.paginationState.pagination.offset,
    state.paginationState.pagination.currentPage *
      state.paginationState.pagination.itemsPerPage
  );
  return paginatedSortedAndFiltered;
}

function getSortedAndFilteredItems(state: RootState) {
  const filteredItems = state.itemsState.items.filter(
    CATEGORY_FILTERS[state.filterState]
  );
  const sortedAndFiltered = filteredItems
    .slice()
    .sort(SORT_BY_SORTER[state.sortState]);

  return sortedAndFiltered;
}

function getSortByItems(state: RootState) {
  return state.itemsState.items.slice().sort(SORT_BY_SORTER[state.sortState]);
}

export {
  getSortByItems,
  getSortedAndFilteredItems,
  getPaginatedSortedAndFilteredItems,
};
