import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./style.css";
import * as ROUTES from "../../constants/routes";

import { withAuthentication } from "../Session";
import Navigation from "../Navigation";
import HomePage from "../Home";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import ManageUsers from "../ManageUsers";
import ManageEvents from "../ManageEvents";
// import LandingPage from "../Landing";

const App = () => (
  <Router>
    <div>
      <Navigation />
    </div>
    {/* <Route exact path={ROUTES.LANDING} component={LandingPage} /> */}
    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route path={ROUTES.HOME} component={HomePage} />
    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    <Route path={ROUTES.ADMIN} component={AdminPage} />
    <Route path={ROUTES.MANAGE_USERS} component={ManageUsers} />
    <Route path={ROUTES.MANAGE_EVENTS} component={ManageEvents} />
  </Router>
);
export default withAuthentication(App);
