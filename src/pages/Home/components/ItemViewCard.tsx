import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Firebase, { withFirebase } from "../../../firebase";
import { AuthUserContext } from "../../../session";

interface CardProps {
  make: string;
  model: string;
  price: number;
  description: string;
  firebase: Firebase;
}
// firebase type only needed in child component => error in parent component when CardProps type
class ItemViewCard extends React.Component<any, any> {
  handleAddToCart(item: object, user: any) {
    this.props.firebase.user(`${user}/cart`).push(item);
  }

  render() {
    const { make, model, price, description } = this.props;
    let item = { make, model, price, description };
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="col-sm">
            <div className="card mt-3" style={{ width: "200px" }}>
              <div className="card-body">
                <h3 className="card-title">{make}</h3>
                <p className="card-text h5">{model}</p>
                <p className="card-text">{description}</p>
                <p>{price} kn</p>
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleAddToCart(item, authUser.uid)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(ItemViewCard);
