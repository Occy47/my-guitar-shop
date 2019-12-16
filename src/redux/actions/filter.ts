import { FILTER_SET } from "../constants";
import { action } from "typesafe-actions";
import { FilterActions } from "../types";

export const doSetFilter = (filter: string): FilterActions =>
  action(FILTER_SET, filter);
