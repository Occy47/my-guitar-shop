import { SET_PAGINATION } from "../constants";
import { PaginationActions } from "../types";
import { action } from "typesafe-actions";

export const doSetPagination = (pagination: object): PaginationActions =>
  action(SET_PAGINATION, pagination);
