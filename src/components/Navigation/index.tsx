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

interface NavigationState {
  menu: boolean;
}

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

class NavigationAuth extends React.Component<NavigationProps, NavigationState> {
  constructor(props: any) {
    super(props);
    this.state = {
      menu: false
    };
    this.handleTooggleManu = this.handleTooggleManu.bind(this);
  }

  handleTooggleManu() {
    this.setState({ menu: !this.state.menu });
  }

  render() {
    const show = this.state.menu ? "show" : "";
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <Link className="navbar-brand" to={ROUTES.LANDING}>
          My-Guitar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={this.handleTooggleManu}
          data-toggle="collapse"
          data-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={"navbar-collapse collapse " + show} id="navbarMain">
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
            {this.props.authUser.roles.includes(ROLES.ADMIN) && (
              <li className="nav-item active">
                <Link className="nav-link" to={ROUTES.ADMIN}>
                  Admin
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav my-2 my-md-0">
            <li className="nav-item active">{this.props.authUser.firstname}</li>
            <li className="nav-item active">
              <SignOutButton />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

class NavigationNonAuth extends React.Component<any, NavigationState> {
  constructor(props: any) {
    super(props);
    this.state = {
      menu: false
    };
    this.handleTooggleManu = this.handleTooggleManu.bind(this);
  }

  handleTooggleManu() {
    this.setState({ menu: !this.state.menu });
  }

  render() {
    const show = this.state.menu ? "show" : "";
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <Link className="navbar-brand" to={ROUTES.LANDING}>
          My-Guitar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={this.handleTooggleManu}
          data-toggle="collapse"
          data-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={"navbar-collapse collapse " + show} id="navbarMain">
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
          <ul className="navbar-nav my-2 my-md-0">
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
      </nav>
    );
  }
}

export default Navigation;
