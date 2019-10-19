import React from "react";
import { compose } from "recompose";
import * as ROLES from "../../constants/roles";
import { Container } from "reactstrap";
import { withAuthorization } from "../../components/Session";
import EventList from "../../components/EventList";

const NewEventsPage = () => {
  return (
    <div>
      <EventList />
    </div>
  );
};

const condition = authUser => authUser && !!authUser.roles[ROLES.STUDENT];
export default compose(withAuthorization(condition))(NewEventsPage);
