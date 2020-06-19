import * as React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";

import { Row, Button } from "antd";

const AdminNavigation = () => (
  <div>
    <Row>
      <Button type="primary" ghost style={{ margin: 6 }}>
        <Link to={ROUTES.ADMIN}>Items</Link>
      </Button>
      <Button type="primary" ghost style={{ margin: 6 }}>
        <Link to={ROUTES.ADMIN_USERS}>Users</Link>
      </Button>
    </Row>
  </div>
);

export default AdminNavigation;
