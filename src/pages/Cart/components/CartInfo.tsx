import * as React from "react";
import { withFirebase } from "../../../firebase";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Dispatch } from "redux";
import { CartItemsActions, RootState } from "../../../redux/types";
import { doDeleteItemFromCart, doEmptyCart } from "../../../redux/actions/cart";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { Item } from "../../../redux/reducers/item";

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
    return (
      <div>
        {this.props.userCart.map((item: Item) => (
          <div key={item.id}>
            <div>{item.make}</div>
            <div>{item.model}</div>
            <div>{item.description}</div>
            <div>{item.price} kn</div>
            <button
              className="btn btn-danger"
              onClick={() => this.props.onDeleteItemFromCart(item)}
            >
              Remove
            </button>
            <hr />
          </div>
        ))}
        <div>Total amount: {this.props.cartTotal} kn</div>
        <button className="btn btn-primary" onClick={this.handleCheckoutButton}>
          Checkout
        </button>
      </div>
    );
  }
}

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
