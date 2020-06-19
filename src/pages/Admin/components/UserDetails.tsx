import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../redux/types";

import { Descriptions } from "antd";

class UserDetails extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
      userCart: [],
      hasPurchased: true,
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    const nextUser = this.props.users.filter((user: any) => {
      return user.uid === params.userId;
    });

    if (nextUser[0].cart !== undefined) {
      const userCartObject: any = nextUser[0].cart;

      const newCart = Object.keys(userCartObject).map((key) => ({
        ...userCartObject[key],
        id: key,
      }));
      this.setState({ userCart: newCart });
    } else {
      this.setState({ hasPurchased: false });
    }
    this.setState({ user: nextUser[0] });
  }

  render() {
    const { user, userCart, hasPurchased } = this.state;
    return (
      <div>
        <h4>Account details: </h4>
        <p>
          First Name: <strong>{user.firstname}</strong>
        </p>
        <p>
          Last Name: <strong>{user.lastname}</strong>
        </p>
        <p>
          Address: <strong> {user.address}</strong>
        </p>
        <p>
          E-mail: <strong>{user.email}</strong>
        </p>
        <h4>Purchases: </h4>
        {hasPurchased ? (
          userCart.map((item: any) => (
            <CartDisplay
              key={item.id}
              id={item.id}
              make={item.make}
              model={item.model}
              price={item.price}
              description={item.description}
              time={item.time}
            />
          ))
        ) : (
          <h5>No Purchases yet</h5>
        )}
      </div>
    );
  }
}

const CartDisplay: React.FC<any> = (props) => (
  <div>
    <Descriptions bordered title={`Purchase #${props.id}`} size="small">
      <Descriptions.Item label="Make">{props.make}</Descriptions.Item>
      <Descriptions.Item label="Model">{props.model}</Descriptions.Item>
      <Descriptions.Item label="Price">{props.price}kn</Descriptions.Item>
      <Descriptions.Item label="Purchased on">{props.time}</Descriptions.Item>
      <Descriptions.Item label="Description">
        {props.description}
      </Descriptions.Item>
    </Descriptions>
    <br />
  </div>
);

const mapStateToProps = (state: RootState) => ({
  users: state.userState.users,
});

export default connect(mapStateToProps, null)(UserDetails);
