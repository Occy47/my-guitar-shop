import * as React from "react";
import { withFirebase } from "../../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";

type PasswordState = {
  email: string;
  error: null | string;
};

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetForm extends React.Component<any, PasswordState> {
  constructor(props: any) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  private static propKey(propertyName: string, value: string): object {
    return { [propertyName]: value };
  }

  onChange(event: any) {
    this.setState({
      [event.target.name]: event.currentTarget.value
    } as PasswordState);
  }

  onSubmit(event: any) {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error: string) => {
        this.setState(PasswordForgetForm.propKey("error", error));
      });
    event.preventDefault();
  }

  render() {
    const { email, error }: any = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="form-control col-5 offset-4"
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="E-mail Address"
        />
        <button
          className="btn btn-primary col-5 btn-block offset-4 mt-2"
          type="submit"
        >
          Reset my password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordForgetForm);
