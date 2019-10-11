import * as React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../../session";
import SignOutButton from "../SignOutButton";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

interface NavigationProps {
  authUser: any;
}

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

class NavigationAuth extends React.Component<NavigationProps, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
        <Navbar.Brand>
          <Link className="navbar-brand" to={ROUTES.LANDING}>
            My-Guitar
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav-main" />
        <Navbar.Collapse id="navbar-nav-main">
          <Nav className="mr-auto">
            <Nav.Item>
              <Link className="nav-link" to={ROUTES.HOME}>
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to={ROUTES.CART}>
                Cart
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to={ROUTES.FAQ}>
                FAQ
              </Link>
            </Nav.Item>
            {this.props.authUser.roles.includes(ROLES.ADMIN) && (
              <Nav.Item>
                <Link className="nav-link" to={ROUTES.ADMIN}>
                  Admin
                </Link>
              </Nav.Item>
            )}
          </Nav>
          <Nav className="mr-sm-2">
            <Navbar.Text>
              Signed in as: {this.props.authUser.firstname}
            </Navbar.Text>
            <SignOutButton />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class NavigationNonAuth extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
        <Navbar.Brand>
          <Link className="navbar-brand" to={ROUTES.LANDING}>
            My-Guitar
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav-main" />
        <Navbar.Collapse id="navbar-nav-main">
          <Nav className="mr-auto">
            <Nav.Item>
              <Link className="nav-link" to={ROUTES.HOME}>
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to={ROUTES.FAQ}>
                FAQ
              </Link>
            </Nav.Item>
          </Nav>
          <Nav className="mr-sm-2">
            <Nav.Item>
              <Link className="nav-link" to={ROUTES.REGISTER}>
                Register
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to={ROUTES.LOGIN}>
                Login
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
