import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CartItemsActions } from "../../../redux/types";
import { doDeleteItemFromCart } from "../../../redux/actions/cart";
import { Item } from "../../../redux/reducers/item";
import { Card, Row, Col, Button, Avatar } from "antd";

class ItemInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    const { id, make, model, thumbUrl, description, price } = item;
    return (
      <Card
        key={id}
        size="small"
        title={make + " - " + model}
        style={{ width: 400 }}
      >
        <Row>
          <Col span={12}>
            <Avatar shape="square" size={80} src={thumbUrl} />
          </Col>
          <Col span={8}>
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Price:</strong> {price} kn
            </p>
          </Col>
          <Col span={4} style={{ paddingLeft: "11px", paddingTop: "20px" }}>
            <Button
              type="primary"
              shape="circle"
              size="large"
              onClick={() => this.props.onDeleteItemFromCart(item)}
              style={{ background: "red", borderColor: "grey" }}
            >
              X
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<CartItemsActions>) => ({
  onDeleteItemFromCart: (item: Item) => dispatch(doDeleteItemFromCart(item))
});

export default connect(null, mapDispatchToProps)(ItemInfo);
