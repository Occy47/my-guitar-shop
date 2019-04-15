import * as React from "react";

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
  }

  onChange(event: any) {
    this.setState({
      [event.target.name]: event.currentTarget.valeu
    } as RegisterFormState);
  }

  render() {
    return (
      <form>
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

export default RegisterForm;
