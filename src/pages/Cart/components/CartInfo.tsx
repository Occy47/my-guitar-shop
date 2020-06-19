import * as React from "react";
import { withFirebase } from "../../../firebase";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Dispatch } from "redux";
import { CartItemsActions, RootState } from "../../../redux/types";
import { doDeleteItemFromCart, doEmptyCart } from "../../../redux/actions/cart";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import { Item } from "../../../redux/reducers/item";
import ItemInfo from "./ItemInfo";

import { Layout, Row, Col, Button, Divider } from "antd";

const { Content } = Layout;

class CartInfo extends React.Component<any, any> {
  listener: any;
  constructor(props: any) {
    super(props);
    this.state = {
      userID: ""
    };
    this.handleCheckoutButton = this.handleCheckoutButton.bind(this);
  }
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        this.setState({ userID: user.uid });
      } else {
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  handleCheckoutButton() {
    this.props.userCart.map((item: Item) =>
      this.props.firebase
        .cart(this.state.userID)
        .push(item)
        .then(() => {
          this.props.onEmptyUserCart();
          this.props.history.push(ROUTES.HOME);
        })
    );
  }

  render() {
    const { userCart, cartTotal } = this.props;
    return (
      <Content style={{ padding: "0 50px" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            minHeight: "480px"
          }}
        >
          <Content
            style={{
              backgroundColor: "white",
              minHeight: "450px"
            }}
          >
            {" "}
            {userCart.length > 0 ? (
              userCart.map((item: Item) => (
                <Row>
                  <ItemInfo key={item.id} item={item} />
                  <Divider />
                </Row>
              ))
            ) : (
              <NoCartItems />
            )}
          </Content>
          <Row style={{ paddingTop: "50px" }}>
            <Col span={8}>Total amount: {cartTotal} kn</Col>
            <Col span={10}></Col>
            <Col span={4}>
              <Link to={ROUTES.HOME}>
                <Button style={{ backgroundColor: "#0ba542", color: "white" }}>
                  Continue shopping
                </Button>
              </Link>
            </Col>
            <Col span={2}>
              <Button type="primary" onClick={this.handleCheckoutButton}>
                Checkout
              </Button>
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

const NoCartItems = () => {
  return (
    <Row style={{ paddingTop: "50px" }}>
      <Col span={8}></Col>
      <Col span={8}>There are no items in your Cart</Col>
      <Col span={8}></Col>
    </Row>
  );
};

const mapStateToProps = (state: RootState) => ({
  userCart: state.cartState.userCart,
  cartTotal: state.cartState.cartTotal
});

const mapDispatchToProps = (dispatch: Dispatch<CartItemsActions>) => ({
  onDeleteItemFromCart: (item: Item) => dispatch(doDeleteItemFromCart(item)),
  onEmptyUserCart: () => dispatch(doEmptyCart())
});

export default compose(
  withFirebase,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CartInfo);
