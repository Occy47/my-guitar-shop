import * as React from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../../session";
import NavigationAuth from "./components/NavigationAuth";

import { Menu, Icon } from "antd";
import "antd/dist/antd.css";

import * as ROUTES from "../../constants/routes";

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

class NavigationNonAuth extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["landing"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="landing" style={{ float: "left" }}>
          <Link to={ROUTES.LANDING}>
            <Icon type="audio" />
            <span>My-guitar</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="home" style={{ float: "left" }}>
          <Link to={ROUTES.HOME}>
            <Icon type="home" />
            <span>Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="faq" style={{ float: "left" }}>
          <Link to={ROUTES.FAQ}>
            <Icon type="bars" />
            <span>FAQ</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="register" style={{ float: "right" }}>
          <Link to={ROUTES.REGISTER}>
            <Icon type="user-add" />
            <span>Register</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="login" style={{ float: "right" }}>
          <Link to={ROUTES.LOGIN}>
            <Icon type="key" />
            <span>Login</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navigation;
