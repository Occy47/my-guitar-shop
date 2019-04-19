import React from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";

import * as ROUTES from "../../constants/routes";

const SignOutButton = ({ firebase }) => (
  <Link className="nav-link" to={ROUTES.LANDING} onClick={firebase.doSignOut}>
    Sign Out
  </Link>
);

export default withFirebase(SignOutButton);
