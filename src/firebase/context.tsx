import * as React from "react";
import Firebase from "./firebase";

const FirebaseContext = React.createContext<Firebase | null>(null);

export interface FirebaseContextProps {
  firebase?: Firebase;
}

export const withFirebase = <P extends object>(
  Component: React.ComponentType<P>
) =>
  class WithFirebase extends React.Component<P & FirebaseContextProps> {
    render() {
      return (
        <FirebaseContext.Consumer>
          {firebase => <Component {...this.props} firebase={firebase} />}
        </FirebaseContext.Consumer>
      );
    }
  };

export default FirebaseContext;
