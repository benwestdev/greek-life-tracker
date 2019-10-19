import React, { useState, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import {
  Col,
  Card,
  CardBody,
  Button,
  FormGroup,
  Form,
  Input,
  Label
} from "reactstrap";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import * as STATUSES from "../../constants/statuses";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import CircleBanner from "../CircleBanner";
import PageHeader from "../PageHeader";
import Loader from "../Loader";

const EventForm = ({ firebase, match }) => {
  const [loading, setLoading] = useState(true);
  const [eventId, setEventId] = useState(
    match && match.params && match.params.id ? match.params.id : null
  );
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [points, setPoints] = useState("");

  const handleSave = () => {
    const event = {
      name,
      type,
      date,
      startTime,
      endTime,
      location,
      points
    };

    if (eventId) {
      firebase.EventApi.editEvent(eventId, event).then(response => {
        console.log("updated successfully");
        clearState();
      });
    } else {
      firebase.EventApi.addEvent(event).then(response => {
        console.log("created successfully");
        clearState();
      });
    }
  };

  const clearState = () => {
    setName("");
    setType("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setLocation("");
    setPoints("");
  };

  const fields = { name, type, date, startTime, endTime, location, points };
  const handlers = {
    setName,
    setType,
    setDate,
    setStartTime,
    setEndTime,
    setLocation,
    setPoints,
    handleSave
  };

  useEffect(() => {
    if (eventId) {
      firebase.EventApi.getEvent(eventId).then(eventResponse => {
        setName(eventResponse.name);
        setType(eventResponse.type);
        setDate(eventResponse.date);
        setStartTime(eventResponse.startTime);
        setEndTime(eventResponse.endTime);
        setLocation(eventResponse.location);
        setPoints(eventResponse.points);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <section className="section section-shaped section-lg">
      <CircleBanner color="success" />

      <PageHeader title={eventId ? "Edit Event" : "Create Event"} />

      <div className="text-center">
        <Link to={ROUTES.MANAGE_EVENTS}>
          <Button className="mb-4" color="primary" type="button">
            Back
          </Button>
        </Link>
      </div>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            {loading && <Loader active inline="centered" color="primary" />}
            {!loading && (
              <EventFormContainer fields={fields} handlers={handlers} />
            )}
          </CardBody>
        </Card>
      </Col>
    </section>
  );
};

const EventFormContainer = ({ fields, handlers }) => {
  return (
    <Form>
      <FormGroup className="mb-3">
        <Label for="name">Name</Label>
        <Input
          style={{ color: "black" }}
          id="name"
          value={fields.name}
          placeholder="Event Name"
          type="text"
          onChange={e => handlers.setName(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <Label for="name">Type</Label>
        <Input
          className="form-control form-control-alternative"
          style={{ color: "black" }}
          id="type"
          value={fields.type}
          placeholder="Event Type"
          type="select"
          onChange={e => handlers.setType(e.target.value)}
        >
          <option>Select Type</option>
          <option>{STATUSES.ALPHA_TYPE}</option>
          <option>{STATUSES.COM_SERVICE_TYPE}</option>
          <option>{STATUSES.SISTERHOOD_TYPE}</option>
        </Input>
      </FormGroup>

      <FormGroup className="mb-3">
        <Label for="name">Date</Label>
        <Input
          style={{ color: "black" }}
          id="name"
          value={fields.date}
          placeholder="Event Date"
          type="date"
          onChange={e => handlers.setDate(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <Label for="name">Start Time</Label>
        <Input
          style={{ color: "black" }}
          value={fields.startTime}
          id="name"
          placeholder="Start Time"
          type="text"
          onChange={e => handlers.setStartTime(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <Label for="name">End Time</Label>
        <Input
          style={{ color: "black" }}
          value={fields.endTime}
          id="name"
          placeholder="End Time"
          type="text"
          onChange={e => handlers.setEndTime(e.target.value)}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <Label for="name">Points</Label>
        <Input
          style={{ color: "black" }}
          value={fields.points}
          id="name"
          placeholder="Points"
          type="text"
          onChange={e => handlers.setPoints(e.target.value)}
        />
      </FormGroup>

      <div className="text-center">
        <Button
          className="my-4"
          color="primary"
          type="button"
          onClick={() => handlers.handleSave()}
        >
          Save
        </Button>
      </div>
    </Form>
  );
};

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withRouter,
  withAuthorization(condition),
  withFirebase
)(EventForm);
