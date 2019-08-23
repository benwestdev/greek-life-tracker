import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon } from "semantic-ui-react";

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
    <Link to={ROUTES.HOME} name="home">
      <Menu.Item name="home">
        <Icon name="home" />
      </Menu.Item>
    </Link>
    {!!authUser.roles[ROLES.STUDENT] && (
      <Fragment>
        <Link to={ROUTES.POINTS} name="points">
          <Menu.Item name="points" />
        </Link>
        <Link to={ROUTES.EVENTS} name="events">
          <Menu.Item name="events" />
        </Link>
      </Fragment>
    )}
    {!!authUser.roles[ROLES.ADMIN] && (
      <Dropdown item text="Admin">
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link
              to={ROUTES.MANAGE_EVENTS}
              name="manageEvents"
              style={{ color: "black" }}
            >
              Manage Events
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link
              to={ROUTES.MANAGE_USERS}
              name="manageUsers"
              style={{ color: "black" }}
            >
              Manage Users
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )}

    <Link to={ROUTES.ACCOUNT} name="account">
      <Menu.Item name="my account">
        <Icon name="cog" />
      </Menu.Item>
    </Link>
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
