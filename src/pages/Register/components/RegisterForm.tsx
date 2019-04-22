import * as React from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import * as ROUTES from "../../../constants/routes";

export interface RegisterFormState {
  firstname: string;
  lastname?: string;
  address?: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
  error: null | string;
}

const INITIAL_STATE = {
  firstname: "",
  lastname: "",
  address: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class RegisterForm extends React.Component<any, RegisterFormState> {
  constructor(props: any) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private static propKey(propertyName: string, value: string): object {
    return { [propertyName]: value };
  }

  onChange(event: any) {
    this.setState({
      [event.target.name]: event.currentTarget.value
    } as RegisterFormState);
  }

  handleSubmit(event: any) {
    const { firstname, lastname, address, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser: any) => {
        return this.props.firebase.user(authUser.user.uid).set({
          firstname,
          lastname,
          address,
          email
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error: string) => {
        this.setState(RegisterForm.propKey("error", error));
      });
    event.preventDefault();
  }

  render() {
    const {
      firstname,
      lastname,
      address,
      email,
      passwordOne,
      passwordTwo,
      error
    }: any = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      firstname === "";

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group col-md-6">
          <label>First name:</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            className="form-control"
            placeholder="Enter first name"
            onChange={this.onChange}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label>Last name:</label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            className="form-control"
            placeholder="Enter last name"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            className="form-control"
            placeholder="Enter address"
            onChange={this.onChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            placeholder="Enter e-mail"
            onChange={this.onChange}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label>Password:</label>
          <input
            type="password"
            name="passwordOne"
            value={passwordOne}
            className="form-control"
            placeholder="Enter password"
            onChange={this.onChange}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <label>Confirm password:</label>
          <input
            type="password"
            name="passwordTwo"
            value={passwordTwo}
            className="form-control"
            placeholder="Confirm password"
            onChange={this.onChange}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isInvalid}
          >
            Register
          </button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default compose(
  withFirebase,
  withRouter
)(RegisterForm) as any;
