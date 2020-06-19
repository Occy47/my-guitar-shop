import * as React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../../SignOutButton";
import { RootState } from "../../../redux/types";
import { connect } from "react-redux";

import { Menu, Icon, Badge } from "antd";
import "antd/dist/antd.css";

import * as ROUTES from "../../../constants/routes";
import * as ROLES from "../../../constants/roles";

interface NavigationProps {
  authUser: any;
  cart?: any;
}

class NavigationAuth extends React.Component<NavigationProps, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { cart, authUser } = this.props;
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
        <Menu.Item key="cart" style={{ float: "left" }}>
          <Link to={ROUTES.CART}>
            <Badge count={cart} offset={[10, -8]}>
              <Icon
                type="shopping-cart"
                style={{ color: "rgba(255, 255, 255, 0.65)" }}
              />
              <span style={{ color: "rgba(255, 255, 255, 0.65)" }}>Cart</span>
            </Badge>
          </Link>
        </Menu.Item>
        <Menu.Item key="faq" style={{ float: "left" }}>
          <Link to={ROUTES.FAQ}>
            <Icon type="bars" />
            <span>FAQ</span>
          </Link>
        </Menu.Item>
        {authUser.roles.includes(ROLES.ADMIN) && (
          <Menu.Item key="admin" style={{ float: "left" }}>
            <Link to={ROUTES.ADMIN}>
              <Icon type="laptop" />
              <span>Admin</span>
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key="logoff" style={{ float: "right" }}>
          <SignOutButton />
        </Menu.Item>
        <Menu.Item key="user" style={{ float: "right" }}>
          <Icon type="user" />
          <span>Signed in as {authUser.firstname}</span>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  cart: state.cartState.userCart.length
});

export default connect(mapStateToProps, null)(NavigationAuth);
