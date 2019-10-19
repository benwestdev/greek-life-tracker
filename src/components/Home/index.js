import React from "react";

import { withAuthorization } from "../Session";
import UserPoints from "../UserPoints";
import ManageEventsPage from "../ManageEvents";
import ViewerDashboard from "../ViewerDashboard";
import EventManagement from "../EventManagement";
import * as ROLES from "../../constants/roles";

const HomePage = ({ authUser }) => {
  if (!authUser) {
    return <h1>No authusre</h1>;
  }
  if (authUser.roles.hasOwnProperty(ROLES.ADMIN)) {
    return <AdminHomePage />;
  } else if (authUser.roles.hasOwnProperty(ROLES.VIEWER)) {
    return <ViewerHomePage />;
  } else if (authUser.roles.hasOwnProperty(ROLES.STUDENT)) {
    return <StudentHomePage />;
  } else {
    return null;
  }
};

const StudentHomePage = () => <UserPoints />;

const AdminHomePage = () => <EventManagement />;

const ViewerHomePage = () => <ViewerDashboard />;

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
