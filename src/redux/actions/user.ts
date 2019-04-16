import { USER_SET } from "../constants";
import { action } from "typesafe-actions";

export const doSetUser = (user: any) => action(USER_SET, user);
