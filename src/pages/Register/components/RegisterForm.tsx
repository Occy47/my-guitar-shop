import * as React from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { UsersActions } from "../../../redux/types";
import { doSetUser } from "../../../redux/actions/user";
import { Dispatch } from "redux";
import { User } from "../../../redux/reducers/user";

export interface RegisterFormState {
  firstname: string;
  lastname?: string;
  address?: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
}

class RegisterForm extends React.Component<any, RegisterFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      address: "",
      email: "",
      passwordOne: "",
      passwordTwo: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(event: any) {
    this.setState({
      [event.target.name]: event.currentTarget.value
    } as RegisterFormState);
    event.preventDefault();
  }

  handleSubmit(event: any) {
    const { firstname, lastname, address, email } = this.state;
    const user = { firstname, lastname, address, email };

    this.props.onSetUser(user);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group col-md-6">
          <label>First name:</label>
          <input
            type="text"
            name="firstname"
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
            className="form-control"
            placeholder="Confirm password"
            onChange={this.onChange}
            required
          />
        </div>
        <div className="form-group col-md-6">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<UsersActions>) => ({
  onSetUser: (user: User) => dispatch(doSetUser(user))
});

const ConnectedRegisterForm = connect(
  null,
  mapDispatchToProps
)(RegisterForm);

export default ConnectedRegisterForm;
