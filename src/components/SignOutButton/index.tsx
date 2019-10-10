import React from "react";
import { withFirebase } from "../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";

import * as ROUTES from "../../constants/routes";

class SignOutButton extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.firebase.doSignOut();
  }

  render() {
    return (
      <Nav.Link href={ROUTES.LANDING} onClick={this.handleClick}>
        Sign Out
      </Nav.Link>
    );
  }
}

export default withFirebase(SignOutButton);
