import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import * as ROUTES from "../../constants/routes";

const Navigation = () => (
  <Menu inverted fixed="top">
    <Link to={ROUTES.SIGN_IN} name="signin">
      <Menu.Item name="sign in" />
    </Link>
    <Link to={ROUTES.SIGN_UP} name="signup">
      <Menu.Item name="sign up" />
    </Link>
    <Link to={ROUTES.LANDING} name="landing">
      <Menu.Item name="sign in" />
    </Link>
    <Link to={ROUTES.ACCOUNT} name="account">
      <Menu.Item name="my account" />
    </Link>
    <Link to={ROUTES.ADMIN} name="admin">
      <Menu.Item name="admin" />
    </Link>
  </Menu>
);

export default Navigation;
å;
