import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../../constants/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { withFirebase } from "../../../firebase";

interface IState {
  email: string;
  password: string;
  error: null | string;
}

const INITIAL_STATE: IState = {
  email: "",
  password: "",
  error: null
};

class LogInForm extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  private static propKey(propertyName: string, value: string): object {
    return { [propertyName]: value };
  }

  onSubmit(event: any) {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error: string) => {
        this.setState(LogInForm.propKey("error", error));
      });
    event.preventDefault();
  }

  onChange(event: any) {
    this.setState({ [event.target.name]: event.currentTarget.value } as IState);
  }

  render() {
    const { email, password, error }: any = this.state;

    return (
      <div className="container">
        <form onSubmit={this.onSubmit} className="form-signin">
          <h3 className="mb-3 font-weight-normal text-center">
            Please Sign In
          </h3>
          <div className="form-group ">
            <label className="offset-4">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              className="form-control col-5 offset-4"
              id="InputEmail"
              placeholder="Enter email"
              onChange={this.onChange}
              required
              autoFocus
            />
          </div>
          <div className="form-group mb-0">
            <label className="offset-4">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              className="form-control col-5 offset-4"
              id="InputPassword"
              placeholder="Password"
              onChange={this.onChange}
              required
            />
          </div>
          <Link className="offset-7" to={ROUTES.FORGOT_PASSWORD}>
            Lost Password?
          </Link>
          <button className="btn btn-primary col-5 btn-block offset-4 mt-2">
            Sign In
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default compose(
  withRouter,
  withFirebase
)(LogInForm);
