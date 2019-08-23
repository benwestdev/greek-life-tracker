import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";

import { withAuthorization } from "../Session";
import Points from "../Points";
import ManageEventsPage from "../ManageEvents";
import * as ROLES from "../../constants/roles";

const HomePage = ({ authUser }) => {
  if (!authUser) {
  }
  if (authUser.roles.hasOwnProperty(ROLES.ADMIN)) {
    return <AdminHomePage />;
  } else if (authUser.roles.hasOwnProperty(ROLES.VIEWER)) {
    return <ViewerHomePage />;
  } else {
    return <StudentHomePage />;
  }
};

const ViewerHomePage = () => (
  <Container>
    <h1>VIEWER PAGE</h1>
  </Container>
);

const StudentHomePage = () => <Points />;

const AdminHomePage = () => <ManageEventsPage />;

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
