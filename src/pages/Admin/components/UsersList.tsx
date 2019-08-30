import * as React from "react";
import { RootState, UsersActions } from "../../../redux/types";
import { User, IUserState } from "../../../redux/reducers/user";
import Firebase, { withFirebase } from "../../../firebase";
import { compose, Dispatch } from "redux";
import { doSetUsers } from "../../../redux/actions/user";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

interface IUserProps {
  users: User[];
  firebase: Firebase;
  onSetUsers: Function;
}

class UsersList extends React.Component<IUserProps, IUserState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
  this.props.firebase.users().on("value", (snapshot: any) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));
      this.props.onSetUsers(usersList);
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        Users:
        {users.map((user: any) => (
          <UserComponent
            key={user.uid}
            firstname={user.firstname}
            lastname={user.lastname}
            address={user.address}
            email={user.email}
          />
        ))}
      </div>
    );
  }
}

const UserComponent: React.FC<User> = props => (
  <div className="list-group-item list-group-item-primary">
    <span>
      <strong>First name: </strong>
      {props.firstname}{" "}
    </span>
    <span>
      <strong>Last name: </strong>
      {props.lastname}{" "}
    </span>
    <span>
      <strong>Address: </strong>
      {props.address}{" "}
    </span>
    <span>
      <strong>E-mail: </strong>
      {props.email}
    </span>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  users: state.userState.users
});

const mapDispatchToProps = (dispatch: Dispatch<UsersActions>) => ({
  onSetUsers: (users: User[]) => dispatch(doSetUsers(users))
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UsersList) as any;
