import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./Navigation";
import LandingPage from "../pages/Landing";
import HomePage from "../pages/Home";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import AdminPage from "./Admin";
import CartPage from "./Cart";
import PasswordForgetPage from "./PasswordForget";
import FaqPage from "./Faq";

import * as ROUTES from "../constants/routes";

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.REGISTER} component={RegisterPage} />
      <Route path={ROUTES.LOGIN} component={LoginPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.CART} component={CartPage} />
      <Route path={ROUTES.FORGOT_PASSWORD} comoponent={PasswordForgetPage} />
      <Route path={ROUTES.FAQ} component={FaqPage} />
    </div>
  </Router>
);

export default App;
