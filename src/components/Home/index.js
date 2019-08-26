import React from "react";

import { withAuthorization } from "../Session";
import Points from "../Points";
import ManageEventsPage from "../ManageEvents";
import ViewerDashboard from "../ViewerDashboard";
import * as ROLES from "../../constants/roles";

const HomePage = ({ authUser }) => {
  if (!authUser) {
    return <h1>No authusre</h1>;
  }
  if (authUser.roles.hasOwnProperty(ROLES.ADMIN)) {
    return <AdminHomePage />;
  } else if (authUser.roles.hasOwnProperty(ROLES.VIEWER)) {
    return <ViewerHomePage />;
  } else {
    return <StudentHomePage />;
  }
};

const StudentHomePage = () => <Points />;

const AdminHomePage = () => <ManageEventsPage />;

const ViewerHomePage = () => <ViewerDashboard />;

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
