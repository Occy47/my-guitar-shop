import * as React from "react";
import { AuthUserContext } from "./";
import { withFirebase } from "../firebase";

interface AuthenticationProps {
  authUser?: any;
  firebase?: any;
}

const withAuthentication = <P extends object>(
  Component: React.ComponentType<P>
) => {
  class WithAuthentication extends React.Component<P & AuthenticationProps> {
    listener: any;
    constructor(props: any) {
      super(props);

      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        (authUser: any) => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser }: any = this.state;
      console.log(authUser);
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};

export default withAuthentication;
