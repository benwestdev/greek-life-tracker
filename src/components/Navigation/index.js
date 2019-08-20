import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { AuthUserContext } from "../Session";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import SignOutButton from "../SignOut";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <Menu inverted fixed="top">
    <Link to={ROUTES.ACCOUNT} name="account">
      <Menu.Item name="my account" />
    </Link>
    {!!authUser.roles[ROLES.ADMIN] && (
      <Link to={ROUTES.ADMIN} name="admin">
        <Menu.Item name="admin" />
      </Link>
    )}
    <Menu.Item position="right">
      <SignOutButton />
    </Menu.Item>
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu inverted fixed="top">
    <Link to={ROUTES.SIGN_IN} name="signin">
      <Menu.Item name="sign in" />
    </Link>
    <Link to={ROUTES.SIGN_UP} name="signup">
      <Menu.Item name="sign up" />
    </Link>
  </Menu>
);
export default Navigation;
