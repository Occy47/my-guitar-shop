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

import * as ROUTES from "../constants/routes";
import "./pages.css";

const { Header, Content, Footer } = Layout;

const App = () => (
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
        <Route path={ROUTES.FORGOT_PASSWORD} component={PasswordForgetPage} />
        <Route path={ROUTES.FAQ} component={FaqPage} />
      </Content>
      <Footer className="footer">My Guitar ©2019 Created by Ocelot</Footer>
    </Layout>
  </Router>
);

export default withAuthentication(App);
