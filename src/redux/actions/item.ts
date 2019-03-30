import { ITEMS_ADD } from "../constants";
import { action } from "typesafe-actions";

// import { Item } from "../reducers/item";

// function doAddItem(newItem: Item) {
//   return {
//     type: ITEMS_ADD,
//     newItem
//   };
// }

// export { doAddItem };

export const addItem = () => action(ITEMS_ADD);
