import * as React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./landing.css";
import "bootstrap/dist/css/bootstrap.min.css";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="container fill">
        <div className="container text-center ">
          <div className="display-2">Welcome to My-guitar Shop!</div>
          <Link className="btn btn-primary lead" to={ROUTES.HOME}>
            Enter
          </Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
