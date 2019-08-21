import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../../firebase";
import { compose } from "recompose";
import "bootstrap/dist/css/bootstrap.min.css";

import * as ROUTES from "../../constants/routes";

class SignOutButton extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  // handleClick() {
  //   this.props.firebase.doSignOut();
  // }

  render() {
    return (
      <Link
        className="nav-link"
        to={ROUTES.LANDING}
        onClick={this.props.firebase.doSignOut}
      >
        Sign Out
      </Link>
    );
  }
}

export default compose(
  withFirebase,
  withRouter
)(SignOutButton);
