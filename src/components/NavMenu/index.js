import React from "react";
import { NavLink as NavLinkRRD } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

const NavMenu = ({ toggleCollapse }) => {
  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <Nav navbar>
            {!!authUser.roles[ROLES.STUDENT] && (
              <StudentNavMenu toggleCollapse={toggleCollapse} />
            )}
            {!!authUser.roles[ROLES.VIEWER] && (
              <ViewerNavMenu toggleCollapse={toggleCollapse} />
            )}
            {!!authUser.roles[ROLES.ADMIN] && (
              <AdminNavMenu toggleCollapse={toggleCollapse} />
            )}
          </Nav>
        ) : (
          <NoAuthNavMenu toggleCollapse={toggleCollapse} />
        )
      }
    </AuthUserContext.Consumer>
  );
};

const StudentNavMenu = ({ toggleCollapse }) => {
  return (
    <>
      <NavItem>
        <h6 className="navbar-heading text-muted ml-3">Student Menu</h6>
        <NavLink
          to={ROUTES.POINTS}
          onClick={toggleCollapse}
          tag={NavLinkRRD}
          className="ml-3"
          activeclassname="active"
        >
          <i className="ni ni-trophy text-blue" />
          My Points
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          to={ROUTES.EVENTS}
          onClick={toggleCollapse}
          tag={NavLinkRRD}
          className="ml-3"
          activeclassname="active"
        >
          <i className="ni ni-calendar-grid-58 text-teal" />
          Upcoming Events
        </NavLink>
      </NavItem>
    </>
  );
};

const ViewerNavMenu = ({ toggleCollapse }) => {
  return (
    <>
      <NavItem>
        <h6 className="navbar-heading text-muted ml-3">Faculty Menu</h6>
        <NavLink
          to={ROUTES.VIEWER_DASHBOARD}
          onClick={toggleCollapse}
          tag={NavLinkRRD}
          className="ml-3"
          activeclassname="active"
        >
          <i className="ni ni-chart-bar-32 text-yellow" />
          Reports
        </NavLink>
      </NavItem>
    </>
  );
};

const AdminNavMenu = ({ toggleCollapse }) => {
  return (
    <>
      <NavItem>
        <h6 className="navbar-heading text-muted ml-3">Admin Menu</h6>
        <NavLink
          to={ROUTES.MANAGE_USERS}
          onClick={toggleCollapse}
          tag={NavLinkRRD}
          className="ml-3"
          activeclassname="active"
        >
          <i className="ni ni-circle-08 text-success" />
          Manage Users
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          to={ROUTES.MANAGE_EVENTS}
          onClick={toggleCollapse}
          tag={NavLinkRRD}
          className="ml-3"
          activeclassname="active"
        >
          <i className="ni ni-calendar-grid-58 text-orange" />
          Manage Events
        </NavLink>
      </NavItem>
    </>
  );
};

const NoAuthNavMenu = ({ toggleCollapse }) => {
  return (
    <>
      <NavItem>
        <NavLink
          to={ROUTES.SIGN_IN}
          onClick={toggleCollapse}
          tag={NavLinkRRD}
          className="ml-3"
          activeclassname="active"
        >
          <i className="ni ni-circle-08 text-purple" />
          Sign In
        </NavLink>
      </NavItem>
    </>
  );
};

export default NavMenu;
