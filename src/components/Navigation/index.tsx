import * as React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../../session";
import SignOutButton from "../SignOutButton";
import "bootstrap/dist/css/bootstrap.min.css";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

interface NavigationProps {
  authUser: any;
}

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth: React.SFC<NavigationProps> = props => (
  <nav className="navbar navbar-expand navbar-dark bg-primary">
    <Link className="navbar-brand" to={ROUTES.LANDING}>
      My-Guitar
    </Link>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to={ROUTES.HOME}>
            Home
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to={ROUTES.CART}>
            Cart
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to={ROUTES.FAQ}>
            FAQ
          </Link>
        </li>
        {props.authUser.roles.includes(ROLES.ADMIN) && (
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.ADMIN}>
              Admin
            </Link>
          </li>
        )}
      </ul>
      <div>
        <ul className="navbar-nav my-2 my-sm-0 ">
          <li className="nav-item active">
            <SignOutButton />
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

const NavigationNonAuth = () => (
  <nav className="navbar navbar-expand navbar-dark bg-primary">
    <Link className="navbar-brand" to={ROUTES.LANDING}>
      My-Guitar
    </Link>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to={ROUTES.HOME}>
            Home
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to={ROUTES.FAQ}>
            FAQ
          </Link>
        </li>
      </ul>
      <div>
        <ul className="navbar-nav my-2 my-sm-0 ">
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.REGISTER}>
              Register
            </Link>
          </li>
          <li className="nav-item active ">
            <Link className="nav-link " to={ROUTES.LOGIN}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navigation;
