import { SORT_BY } from "../constants";
import { SortByActions } from "../types";
import { action } from "typesafe-actions";

export const doSetSortBy = (sorter: string): SortByActions =>
  action(SORT_BY, sorter);
