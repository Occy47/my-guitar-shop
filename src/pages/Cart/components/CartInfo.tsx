import * as React from "react";
import { withFirebase } from "../../../firebase";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Dispatch } from "redux";
import { CartItemsActions, RootState } from "../../../redux/types";
import { totalmem } from "os";
import { doDeleteItemFromCart } from "../../../redux/actions/cart";

class CartInfo extends React.Component<any, any> {
  listener: any;
  constructor(props: any) {
    super(props);
    this.state = {
      userID: "",
      total: 0
    };
  }
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        this.setState({ userID: user.uid });
        console.log(user.uid);
      } else {
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  // getTotalPrice() {
  //   if (this.props.userCart.length > 0) {
  //     var totalPrice = this.props.userCart.reduce(
  //       (prevValue: any, nextValue: any) => {
  //         return {
  //           price: Number(prevValue.price) + Number(nextValue.price)
  //         };
  //       }
  //     );
  //     this.setState({ total: totalPrice.price });
  //   } else {
  //     this.setState({ total: 0 });
  //   }
  // }

  render() {
    return (
      <div>
        {this.props.userCart.map((item: any) => (
          <div key={item.id}>
            <div>{item.make}</div>
            <div>{item.model}</div>
            <div>{item.description}</div>
            <div>{item.price} kn</div>
            <button onClick={() => this.props.onDeleteItemFromCart(item)}>
              Remove
            </button>
            <hr />
          </div>
        ))}
        <div>Total amount: {this.props.cartTotal} kn</div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userCart: state.cartState.userCart,
  cartTotal: state.cartState.cartTotal
});

const mapDispatchToProps = (dispatch: Dispatch<CartItemsActions>) => ({
  onDeleteItemFromCart: (item: any) => dispatch(doDeleteItemFromCart(item))
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CartInfo);
