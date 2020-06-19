import * as React from "react";
import { RootState, UsersActions } from "../../../redux/types";
import { User, IUserState } from "../../../redux/reducers/user";
import Firebase, { withFirebase } from "../../../firebase";
import { compose, Dispatch } from "redux";
import { doSetUsers } from "../../../redux/actions/user";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { List, Button } from "antd";

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

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
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
        <h5>Users: </h5>
        <List style={{ background: "#676767", padding: 6 }}>
          {users.map((user: any) => (
            <UserComponent
              key={user.uid}
              firstname={user.firstname}
              email={user.email}
              id={user.uid}
            />
          ))}
        </List>
      </div>
    );
  }
}

const UserComponent: React.FC<any> = (props) => (
  <List.Item style={{ border: "#8c8c8c solid 1px" }}>
    <span>
      <strong>First name: </strong>
      {props.firstname}{" "}
    </span>
    <span>
      <strong>E-mail: </strong>
      {props.email}{" "}
    </span>
    <span>
      <Link to={`/admin/user/${props.id}`}>
        <Button type="primary" style={{ margin: 6 }}>
          Details
        </Button>
      </Link>
    </span>
  </List.Item>
);

const mapStateToProps = (state: RootState) => ({
  users: state.userState.users,
});

const mapDispatchToProps = (dispatch: Dispatch<UsersActions>) => ({
  onSetUsers: (users: User[]) => dispatch(doSetUsers(users)),
});

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(UsersList) as any;
