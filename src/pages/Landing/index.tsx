import * as React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import "./landing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { doSetItems } from "../../redux/actions/item";
import { ItemsActions } from "../../redux/types";
import { withFirebase } from "../../firebase";
import { compose } from "recompose";
import { connect } from "react-redux";

class LandingPage extends React.Component<any, any> {
  componentDidMount() {
    this.props.firebase.items().on("value", (snapshot: any) => {
      const itemsObject = snapshot.val();

      const itemsList = Object.keys(itemsObject).map(key => ({
        ...itemsObject[key],
        id: key
      }));
      this.props.onSetItems(itemsList);
    });
  }

  componentWillUnmount() {
    this.props.firebase.items().off();
  }

  render() {
    return (
      <div className="container fill">
        <div className="container text-center ">
          <div className="display-3">Welcome to My-guitar Shop!</div>
          <Link className="btn btn-primary lead" to={ROUTES.HOME}>
            Enter
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<ItemsActions>) => ({
  onSetItems: (items: any) => dispatch(doSetItems(items))
});

const ConnectedLandigPage = compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withFirebase
)(LandingPage);

export default ConnectedLandigPage;
