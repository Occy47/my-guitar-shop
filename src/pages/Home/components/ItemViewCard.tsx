import * as React from "react";
import CardModal from "./CardModal";
import { connect } from "react-redux";
import { doAddItemToCartWithAlert } from "../../../redux/thunks";
import { ThunkDispatch } from "redux-thunk";
import { AuthUserContext } from "../../../session";
import { withRouter } from "react-router";
import { compose } from "recompose";
import * as ROUTES from "../../../constants/routes";

interface CardProps {
  make: string;
  model: string;
  price: number;
  description: string;
}

class ItemViewCard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalShow: false
    };
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  handleShowModal() {
    this.setState({ modalShow: !this.state.modalShow });
  }

  render() {
    const { modalShow } = this.state;
    const {
      id,
      make,
      model,
      price,
      description,
      thumbUrl,
      images
    } = this.props;
    let item = { id, make, model, price, description, thumbUrl };
    let imageArray = [
      images.imageOneUrl,
      images.imageTwoUrl,
      images.imageThreeUrl
    ];
    console.log(imageArray);
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <div className="col-md-3">
              <div
                className="card text-white bg-dark mb-4"
                style={{ width: "100%" }}
              >
                <img
                  src={thumbUrl}
                  className="card-img-top"
                  alt="..."
                  onClick={this.handleShowModal}
                ></img>
                <div className="card-body">
                  <h3 className="card-title">{make}</h3>
                  <p className="card-text h5">{model}</p>
                  <p className="card-text">{description}</p>
                  <p>{price} kn</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.props.onAddItemToCart(item, item.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <CardModal
                show={modalShow}
                onHide={this.handleShowModal}
                images={imageArray}
              />
            </div>
          ) : (
            <div className="col-md-3">
              <div
                className="card text-white bg-dark mb-4"
                style={{ width: "100%" }}
              >
                <img
                  src={thumbUrl}
                  className="card-img-top"
                  alt="..."
                  onClick={this.handleShowModal}
                ></img>
                <div className="card-body">
                  <h3 className="card-title">{make}</h3>
                  <p className="card-text h5">{model}</p>
                  <p className="card-text">{description}</p>
                  <p>{price} kn</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.props.history.push(ROUTES.LOGIN)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <CardModal
                show={modalShow}
                onHide={this.handleShowModal}
                images={imageArray}
              />
            </div>
          )
        }
      </AuthUserContext.Consumer>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  onAddItemToCart: (item: any, id: string) =>
    dispatch(doAddItemToCartWithAlert(item, id))
});

export default compose<any, any>(
  connect(null, mapDispatchToProps),
  withRouter
)(ItemViewCard);
