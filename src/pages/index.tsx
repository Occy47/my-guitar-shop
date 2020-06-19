import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";

import Navigation from "../components/Navigation";
import LandingPage from "./Landing";
import HomePage from "./Home";
import RegisterPage from "./Register";
import LoginPage from "./Login";
import AdminPage from "./Admin";
import CartPage from "./Cart";
import PasswordForgetPage from "./PasswordForget";
import FaqPage from "./Faq";
import { withAuthentication } from "../session";

import { withFirebase } from "../firebase";
import { compose } from "recompose";
import { connect } from "react-redux";
import { ItemsActions } from "../redux/types";
import { doSetItems } from "../redux/actions/item";

import * as ROUTES from "../constants/routes";
import "antd/dist/antd.css";
import "./pages.css";

const { Header, Content, Footer } = Layout;

class App extends React.Component<any, any> {
  componentDidMount() {
    this.props.firebase.items().on("value", (snapshot: any) => {
      const itemsObject = snapshot.val();

      const itemsList = Object.keys(itemsObject).map((key) => ({
        ...itemsObject[key],
        id: key,
      }));
      this.props.onSetItems(itemsList);
    });
  }

  componentWillUnmount() {
    this.props.firebase.items().off();
  }

  render() {
    return (
      <Router>
        <Layout className="background">
          <Header>
            <Navigation />
          </Header>
          <Content>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.REGISTER} component={RegisterPage} />
            <Route path={ROUTES.LOGIN} component={LoginPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.CART} component={CartPage} />
            <Route
              path={ROUTES.FORGOT_PASSWORD}
              component={PasswordForgetPage}
            />
            <Route path={ROUTES.FAQ} component={FaqPage} />
          </Content>
          <Footer className="footer">My Guitar ©2019 Created by Ocelot</Footer>
        </Layout>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<ItemsActions>) => ({
  onSetItems: (items: any) => dispatch(doSetItems(items)),
});

const ConnectedApp = compose(
  connect(null, mapDispatchToProps),
  withFirebase,
  withAuthentication
)(App);

export default ConnectedApp;
