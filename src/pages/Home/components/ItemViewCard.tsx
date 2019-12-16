import * as React from "react";
import CardModal from "./CardModal";
import { connect } from "react-redux";
import { doAddItemToCartWithAlert } from "../../../redux/thunks";
import { ThunkDispatch } from "redux-thunk";
import { AuthUserContext } from "../../../session";
import { withRouter } from "react-router";
import { compose } from "recompose";
import * as ROUTES from "../../../constants/routes";

import { Card, Layout, Button, Icon } from "antd";
import "antd/dist/antd.css";

const { Meta } = Card;

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

    let d = new Date();
    var hour = d.getHours();
    var min = d.getMinutes();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    var timeAndDate = hour + ":" + min + " " + day + "/" + month + "/" + year;

    let item = {
      id,
      make,
      model,
      price,
      description,
      thumbUrl,
      time: timeAndDate
    };
    let imageArray = [
      images.imageOneUrl,
      images.imageTwoUrl,
      images.imageThreeUrl
    ];
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <Card
              hoverable
              style={{ width: 240, margin: "15px" }}
              cover={
                <img
                  src={thumbUrl}
                  alt="..."
                  onClick={this.handleShowModal}
                ></img>
              }
            >
              <Meta title={make} description={model + " - " + description} />
              <p>{price + " kn"}</p>
              <Button
                type="primary"
                icon="shopping-cart"
                onClick={() => this.props.onAddItemToCart(item, item.id)}
              >
                Add to Cart
              </Button>
              <CardModal
                show={modalShow}
                onHide={this.handleShowModal}
                images={imageArray}
              />
            </Card>
          ) : (
            <Card
              hoverable
              style={{ width: 240, margin: "15px" }}
              cover={
                <img
                  src={thumbUrl}
                  alt="..."
                  onClick={this.handleShowModal}
                ></img>
              }
            >
              <Meta title={make} description={model + " - " + description} />
              <p>{price + " kn"}</p>
              <Button
                type="primary"
                icon="shopping-cart"
                onClick={() => this.props.history.push(ROUTES.LOGIN)}
              >
                Add to Cart
              </Button>
              <CardModal
                show={modalShow}
                onHide={this.handleShowModal}
                images={imageArray}
              />
            </Card>
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
