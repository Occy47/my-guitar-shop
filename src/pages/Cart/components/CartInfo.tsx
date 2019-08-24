import * as React from "react";
import { withFirebase } from "../../../firebase";

class CartInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      userID: "",
      userCart: []
    };
  }
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        this.setState({ userID: user.uid });
        console.log(user.uid);
      } else {
      }
    });
  }

  handleGetCart() {
    this.props.firebase.cart(this.state.userID).on("value", (snapshot: any) => {
      const cartObject = snapshot.val();

      const cartList = Object.keys(cartObject).map(key => ({
        ...cartObject[key],
        id: key
      }));
      this.setState({ userCart: cartList });
    });
  }

  render() {
    console.log(this.state.userCart);
    return (
      <div>
        {this.state.userCart.map((item: any) => (
          <div key={item.id}>
            <div>{item.model}</div>
            <div>{item.description}</div>
            <div>{item.price} kn</div>
            <hr />
          </div>
        ))}
        <button onClick={() => this.handleGetCart()}>get cart</button>
      </div>
    );
  }
}

export default withFirebase(CartInfo);
