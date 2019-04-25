import * as React from "react";
import { withFirebase } from "../../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";

interface IState {
  passwordOne: string;
  passwordTwo: string;
  error: null | string;
}

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeForm extends React.Component<any, IState> {
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
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error: string) => {
        this.setState(PasswordChangeForm.propKey("error", error));
      });
    event.preventDefault();
  }

  onChange(event: any) {
    this.setState({ [event.target.name]: event.currentTarge.value } as IState);
  }

  render() {
    const { passwordOne, passwordTwo, error }: any = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
          required
          autoFocus
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
          required
        />
        <button disabled={isInvalid} type="submit">
          Change my Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
