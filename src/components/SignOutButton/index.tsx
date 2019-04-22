import React from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../../firebase";
import { FirebaseContextProps } from "../../firebase/context";
import "bootstrap/dist/css/bootstrap.min.css";

import * as ROUTES from "../../constants/routes";

// const SignOutButton = ({ firebase }) => (
//   <Link className="nav-link" to={ROUTES.LANDING} onClick={firebase.doSignOut}>
//     Sign Out
//   </Link>
// );

class SignOutButton extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event: any) {
    this.props.firebase.doSignOut();
    event.preventDefault();
  }

  render() {
    return (
      <Link className="nav-link" to={ROUTES.LANDING} onClick={this.handleClick}>
        Sign Out
      </Link>
    );
  }
}

export default withFirebase(SignOutButton);
