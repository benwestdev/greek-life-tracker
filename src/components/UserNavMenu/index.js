import React from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  Nav,
  Media,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";

const UserNavMenu = ({ firebase }) => {
  return (
    <AuthUserContext.Consumer>
      {authUser => <UserNavMenuBase authUser={authUser} firebase={firebase} />}
    </AuthUserContext.Consumer>
  );
};

const UserNavMenuBase = ({ authUser, firebase }) => {
  console.log({ authUser });
  const logout = () => {
    firebase.AuthApi.doSignOut();
  };

  return (
    <Nav className="align-items-center d-md-flex" navbar>
      <UncontrolledDropdown nav>
        <DropdownToggle className="pr-0" nav>
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img
                alt="..."
                src={
                  authUser.picture
                    ? authUser.picture
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaphpj5pqruSVEcscDz7Qq3zDEeE-TxVudp8yNf3lOWCBGUoGe"
                }
              />
            </span>
            <Media className="ml-2 d-none d-lg-block">
              <span className="mb-0 text-sm font-weight-bold">
                {authUser.username}
              </span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow user-menu-drop-down" right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          <DropdownItem to={ROUTES.ACCOUNT} tag={Link}>
            <i className="ni ni-single-02" />
            <span>My profile</span>
          </DropdownItem>
          <DropdownItem to={ROUTES.SUPPORT} tag={Link}>
            <i className="ni ni-support-16" />
            <span>Support</span>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => logout()}>
            <i className="ni ni-user-run" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  );
};

export default withFirebase(UserNavMenu);
