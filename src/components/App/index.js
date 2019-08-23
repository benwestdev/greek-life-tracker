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
import CreateEvent from "../ManageEvents/createEvent";
import ViewEvent from "../ManageEvents/viewEvent";
import EventsPage from "../Events";
import PointsPage from "../Points";
import { SignOut } from "../SignOut";

const App = () => (
  <Router>
    <div>
      <Navigation />
    </div>
    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route exact path={ROUTES.HOME} component={HomePage} />
    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
    <Route path={ROUTES.ADMIN} component={AdminPage} />
    <Route path={ROUTES.MANAGE_USERS} component={ManageUsers} />
    <Route path={ROUTES.SIGN_OUT} component={SignOut} />

    {/* Admin Manage Events */}
    <Route exact path={ROUTES.MANAGE_EVENTS} component={ManageEvents} />
    <Route exact path={ROUTES.CREATE_EVENT} component={CreateEvent} />
    <Route path={ROUTES.VIEW_EVENT} component={ViewEvent} />
    <Route path={ROUTES.EDIT_EVENT} component={CreateEvent} />

    {/* User Events */}
    <Route path={ROUTES.EVENTS} component={EventsPage} />
    <Route path={ROUTES.POINTS} component={PointsPage} />
  </Router>
);
export default withAuthentication(App);
