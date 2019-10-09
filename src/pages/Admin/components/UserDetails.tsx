import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../redux/types";
import "bootstrap/dist/css/bootstrap.min.css";

class UserDetails extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
      userCart: [],
      hasPurchased: true
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    const nextUser = this.props.users.filter((user: any) => {
      return user.uid === params.userId;
    });

    if (nextUser[0].cart !== undefined) {
      const userCartObject: any = nextUser[0].cart;

      const newCart = Object.keys(userCartObject).map(key => ({
        ...userCartObject[key],
        id: key
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
        <p>First Name: {user.firstname}</p>
        <p>Last Name: {user.lastname}</p>
        <p>Address: {user.address}</p>
        <p>E-mail: {user.email}</p>
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
            />
          ))
        ) : (
          <h5>No Purchases yet</h5>
        )}
      </div>
    );
  }
}

const CartDisplay: React.FC<any> = props => (
  <div
    className="jumbotron jumbotron-fluid"
    style={{ paddingTop: "40px", paddingBottom: "40px" }}
  >
    <div className="container">
      <h5>Purchase #{props.id}</h5>
      <p>Make: {props.make}</p>
      <p>Model: {props.model}</p>
      <p>Price: {props.price}kn</p>
      <p>Description: {props.description}</p>
    </div>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  users: state.userState.users
});

export default connect(
  mapStateToProps,
  null
)(UserDetails);
