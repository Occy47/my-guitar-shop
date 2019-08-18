import * as React from "react";
import AddItem from "./components/AddItem";
import ConnectedItemsList from "./components/ItemList";
import ConnectedItemSorter from "../../components/ItemSorter";
import UsersList from "./components/UsersList";
import { compose } from "recompose";

import { withAuthorization } from "../../session";
import * as ROLES from "../../constants/roles";

const AdminPage = () => (
  <div>
    Admin Page
    <AddItem />
    <hr />
    <ConnectedItemSorter />
    <ConnectedItemsList />
    <hr />
    <UsersList />
  </div>
);

const condition = (authUser: any) =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(withAuthorization(condition))(AdminPage);
