import React from "react";
import { withFirebase } from "../../firebase";
import { Icon } from "antd";
import "antd/dist/antd.css";

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
      <a href={ROUTES.LANDING} onClick={this.handleClick}>
        <Icon type="poweroff" />
        <span>Sign Out</span>
      </a>
    );
  }
}

export default withFirebase(SignOutButton);
