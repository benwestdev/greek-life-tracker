import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { withAuthorization } from "../Session";
import { Card, CardHeader, CardBody, Col, Table, Button } from "reactstrap";
import CircleBanner from "../CircleBanner";
import PageHeader from "../PageHeader";
import Loader from "../Loader";
import "./style.css";

const EventManagement = ({ firebase }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase.EventApi.getAllEvents().then(eventResult => {
      setEvents(eventResult);
      setLoading(false);
    });
  }, []);

  const pageHeaderText =
    "Use this page to create new events and manage approvals for existing events";

  return (
    <section className="section section-shaped section-lg">
      <CircleBanner color="success" />

      <PageHeader title="Manage Events" text={pageHeaderText} />

      <div className="text-center">
        <Link to={ROUTES.CREATE_EVENT}>
          <Button className="mb-4" color="primary" type="button">
            Add Event
          </Button>
        </Link>
      </div>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-2">
            <div className="text-muted text-center mt-1 mb-1">
              <h3>All Users</h3>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {loading && <Loader active inline="centered" color="primary" />}

            {events && events.length > 0 && (
              <Table className="align-items-center table-flush" responsive>
                <tbody>
                  {events.map(event => (
                    <EventRow
                      event={event}
                      firebase={firebase}
                      key={event.uid}
                    />
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </Col>
    </section>
  );
};

const EventRow = ({ event, firebase }) => {
  const eventName =
    event && event.name.length > 20
      ? event.name.substring(0, 18) + "..."
      : event.name;

  return (
    <tr key={event.uid}>
      <td>
        <h4>{eventName}</h4>
        <h5>{moment(event.date).format("LL")}</h5>
      </td>
      <td>
        <Link to={`${ROUTES.MANAGE_ATTENDANCE_BASE}${event.uid}`}>
          <Button size="sm" color="primary">
            Approvals
          </Button>
        </Link>
      </td>
      <td>
        <Link to={`${ROUTES.EDIT_EVENT_BASE}${event.uid}`}>
          <Button size="sm" color="primary">
            Edit
          </Button>
        </Link>
      </td>
    </tr>
  );
};

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(EventManagement);
