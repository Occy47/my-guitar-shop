import * as React from "react";
import { withFirebase } from "../firebase";
import { compose } from "recompose";
import * as ROUTES from "../constants/routes";
import { withRouter } from "react-router";
import { AuthUserContext } from ".";

interface AuthorizationProps {
  authUser?: any;
  firebase?: any;
  history?: any;
}

const withAuthorization = (condition: any) => <P extends object>(
  Component: React.ComponentType<P>
) => {
  class WithAuthorization extends React.Component<P & AuthorizationProps> {
    listener: any;
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        (authUser: any) => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.LOGIN);
          }
        },
        () => this.props.history.push(ROUTES.LOGIN)
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization as any);
};

export default withAuthorization;
