import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import * as ROUTES from "../../constants/routes";

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
    <li>
      <Link to={ROUTES.CART}>Cart</Link>
    </li>
    <li>
      <Link to={ROUTES.FORGOT_PASSWORD}>Lost Password</Link>
    </li>
    <li>
      <Link to={ROUTES.FAQ}>FAQ</Link>
    </li>
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
  </div>
);

export default Navigation;
