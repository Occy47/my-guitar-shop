import * as React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";

const AdminNavigation = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.ADMIN}>Items</Link>
        </li>
        <li>
          <Link to={ROUTES.ADMIN_USERS}>Users</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default AdminNavigation;
