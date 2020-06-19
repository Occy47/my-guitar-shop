import { SET_PAGINATION } from "../constants";

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  offset: number;
}

export interface PaginationState {
  pagination: Pagination;
}

const INITIAL_STATE = {
  pagination: {
    currentPage: 1,
    itemsPerPage: 4,
    offset: 0,
  },
};

function applyPagination(state: PaginationState, action: any) {
  var pagination = action.payload;
  //   var currentPage = action.payload.currentPage;
  //   var itemsPerPage = action.payload.itemsPerPage;
  //   var offset = action.payload.offset;
  console.log("reducer: " + action.payload);
  return { ...state, ...pagination };
}

function paginationReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case SET_PAGINATION:
      return applyPagination(state, action);
    default:
      return state;
  }
}

export default paginationReducer;
