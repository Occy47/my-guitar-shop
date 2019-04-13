import { SORTER_SET } from "../constants";
import { action } from "typesafe-actions";
import { SorterActions } from "../types";

export const doSetFilter = (filter: string): SorterActions =>
  action(SORTER_SET, filter);
