import React from "react";
import AdminNavbar from "../../theme/components/Navbars/AdminNavbar.jsx";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthUserContext } from "../Session";
import * as ROUTES from "../../constants/routes";
import { Container } from "reactstrap";
import NavBar from "../NavBar";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

class NavigationAuth extends React.Component {
  render() {
    return (
      <>
        <NavBar />
      </>
    );
  }
}

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
