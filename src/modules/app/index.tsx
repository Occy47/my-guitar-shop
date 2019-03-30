import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../navigation";
import LandingPage from "../app/components/landing";
import HomePage from "./components/home";
import RegisterPage from "./components/register";
import LoginPage from "./components/login";

import * as ROUTES from "../navigation/consts/routes";

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.REGISTER} component={RegisterPage} />
      <Route path={ROUTES.LOGIN} component={LoginPage} />
    </div>
  </Router>
);

export default App;
