import * as React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";

class LogInForm extends React.Component<any, any> {
  render() {
    return (
      <div className="container">
        <form className="form-signin ">
          <h3 className="mb-3 font-weight-normal text-center">
            Please Sign In
          </h3>
          <div className="form-group ">
            <label className="offset-4">Email Address</label>
            <input
              type="email"
              className="form-control col-5 offset-4"
              id="InputEmail"
              placeholder="Enter email"
              required
              autoFocus
            />
          </div>
          <div className="form-group mb-0">
            <label className="offset-4">Password</label>
            <input
              type="password"
              className="form-control col-5 offset-4"
              id="InputPassword"
              placeholder="Password"
              required
            />
          </div>
          <Link className="offset-7" to={ROUTES.FORGOT_PASSWORD}>
            Lost Password?
          </Link>
          <button className="btn btn-primary col-5 btn-block offset-4 mt-2">
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default LogInForm;
