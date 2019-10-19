import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./style.css";
import * as ROUTES from "../../constants/routes";

import { withAuthentication } from "../Session";
import { AuthUserContext } from "../Session";
import HomePage from "../Home";
import Register from "../Register";
import Login from "../Login";
import ForgotPassword from "../ForgotPassword";
import Profile from "../Profile";
import AdminPage from "../Admin";
import ManageEvents from "../EventManagement";
import ViewEvent from "../ManageEvents/viewEvent";
import EventsPage from "../../pages/Events";
import UserPoints from "../UserPoints";
import UserManagement from "../UserManagement";
import AttendanceManagement from "../AttendanceManagement";
import Support from "../Support";
import { SignOut } from "../SignOut";
import EventForm from "../EventForm";
import NavBar from "../NavBar";
import Footer from "../Footer";

const App = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Router>
        <div>{authUser && <NavBar />}</div>
        <Route path={ROUTES.SIGN_UP} component={Register} />
        <Route path={ROUTES.SIGN_IN} component={Login} />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={ForgotPassword} />
        <Route path={ROUTES.ACCOUNT} component={Profile} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.MANAGE_USERS} component={UserManagement} />
        <Route path={ROUTES.SIGN_OUT} component={SignOut} />
        <Route path={ROUTES.SUPPORT} component={Support} />

        {/* Admin Manage Events */}
        <Route exact path={ROUTES.MANAGE_EVENTS} component={ManageEvents} />
        <Route
          exact
          path={ROUTES.MANAGE_ATTENDANCE}
          component={AttendanceManagement}
        />
        <Route exact path={ROUTES.CREATE_EVENT} component={EventForm} />
        <Route path={ROUTES.EDIT_EVENT} component={EventForm} />
        <Route path={ROUTES.VIEW_EVENT} component={ViewEvent} />

        {/* User Events */}
        <Route path={ROUTES.EVENTS} component={EventsPage} />
        <Route path={ROUTES.POINTS} component={UserPoints} />

        {/* Viewer Routes */}
        <Route path={ROUTES.VIEWER_DASHBOARD} component={EventsPage} />
        <Footer />
      </Router>
    )}
  </AuthUserContext.Consumer>
);
export default withAuthentication(App);
