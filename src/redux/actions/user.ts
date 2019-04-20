import { USERS_SET } from "../constants";
import { action } from "typesafe-actions";

export const doSetUsers = (users: any) => action(USERS_SET, users);
