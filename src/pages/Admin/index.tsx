import * as React from "react";
import AddItem from "./components/AddItem";
import ConnectedItemsList from "./components/ItemList";
import ConnectedItemSorter from "../../components/ItemSorter";
import UsersList from "./components/UsersList";
import { compose } from "recompose";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { withAuthorization } from "../../session";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";
import AdminNavigation from "./components/AdminNavigation";

const AdminPage = () => (
  <Router>
    <div>
      <h3>Admin Page</h3>
      <AdminNavigation />
      <Route exact path={ROUTES.ADMIN} component={AddItem} />
      <hr />
      <Route exact path={ROUTES.ADMIN} component={ConnectedItemSorter} />
      <Route exact path={ROUTES.ADMIN} component={ConnectedItemsList} />
      <Route path={ROUTES.ADMIN_USERS} component={UsersList} />
    </div>
  </Router>
);

const condition = (authUser: any) =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(withAuthorization(condition))(AdminPage);
