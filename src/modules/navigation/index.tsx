import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import * as ROUTES from "./consts/routes";

const Navigation = () => (
  <div className="container">
    <li>
      <Link to={ROUTES.REGISTER}>Register</Link>
    </li>
    <li>
      <Link to={ROUTES.LOGIN}>Login</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
  </div>
);

export default Navigation;
