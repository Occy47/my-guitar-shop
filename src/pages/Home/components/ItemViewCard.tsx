import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dispatch } from "redux";
import { CartItemsActions } from "../../../redux/types";
import { doAddItemToCart } from "../../../redux/actions/cart";
import { connect } from "react-redux";

interface CardProps {
  make: string;
  model: string;
  price: number;
  description: string;
}

class ItemViewCard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { id, make, model, price, description } = this.props;
    let item = { id, make, model, price, description };
    console.log(item);
    return (
      <div className="col-sm">
        <div className="card mt-3" style={{ width: "200px" }}>
          <div className="card-body">
            <h3 className="card-title">{make}</h3>
            <p className="card-text h5">{model}</p>
            <p className="card-text">{description}</p>
            <p>{price} kn</p>
            <button
              className="btn btn-primary"
              onClick={() => this.props.onAddItemToCart(item)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<CartItemsActions>) => ({
  onAddItemToCart: (item: any) => dispatch(doAddItemToCart(item))
});

export default connect(
  null,
  mapDispatchToProps
)(ItemViewCard);
