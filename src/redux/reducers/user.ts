import { USERS_SET } from "../constants";
import { UsersActions } from "../types";

export interface User {
  firstname: string;
  lastname?: string;
  address?: string;
  email: string;
}

export interface IUserState {
  users: User[];
}

const INITIAL_STATE: IUserState = {
  users: []
};

function applySetUser(state: IUserState, action: UsersActions) {
  const users = action.payload;
  return { ...state, users };
}

function userReducer(state = INITIAL_STATE, action: UsersActions) {
  switch (action.type) {
    case USERS_SET: {
      return applySetUser(state, action);
    }
    default:
      return state;
  }
}

export default userReducer;
