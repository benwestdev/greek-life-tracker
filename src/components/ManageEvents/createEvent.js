import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Dropdown,
  Button,
  TextArea,
  Grid,
  Header
} from "semantic-ui-react";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";

import { withAuthorization } from "../Session";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";

const EVENT_TYPES = [
  {
    key: "Alpha Gam",
    text: "Alpha Gam",
    value: "Alpha Gam"
  },
  {
    key: "Philanthropy/Community Service",
    text: "Philanthropy/Community Service",
    value: "Philanthropy/Community Service"
  },
  {
    key: "Sisterhood",
    text: "Sisterhood",
    value: "Sisterhood"
  }
];

const INITIAL_STATE = {
  name: "",
  type: "",
  points: "",
  date: "",
  startTime: "",
  endTime: "",
  location: ""
};

class CreateEventBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleInputChange = (event, option) => {
    if (option) {
      this.setState({ [option.name]: option.value });
    } else if (this.state.hasOwnProperty(event.target.name)) {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  onSubmit = () => {
    //TODO: add toast error handling & only grab event related fields from state when that happens
    const eventObject = this.state;
    console.log(eventObject);
    this.props.firebase
      .addEvent(eventObject)
      .then(() => {
        console.log("success");
      })
      .catch(error => {
        console.log("error adding event: ", error);
      });
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const {
      name,
      type,
      points,
      date,
      startTime,
      endTime,
      location
    } = this.state;

    const isDisabled =
      name === "" ||
      type === "" ||
      points === "" ||
      isNaN(points) ||
      date === "";

    return (
      <Container className="body-container">
        <Header as="h1" textAlign="center">
          Make Event
        </Header>
        <Form size="big" className="top-margin">
          <Form.Field>
            <label>Event Name</label>
            <input
              name="name"
              placeholder="Event Name"
              value={name}
              onChange={event => this.handleInputChange(event)}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Type</label>
            <Dropdown
              placeholder="Select Event Type"
              name="type"
              onChange={(event, options) => {
                this.handleInputChange(event, options);
              }}
              selection
              options={EVENT_TYPES}
              value={type}
            />
          </Form.Field>
          <Form.Input
            label="Points"
            name="points"
            error={
              isNaN(points)
                ? { content: "Enter a Number", pointing: "above" }
                : null
            }
            placeholder="Example: 20"
            value={points}
            onChange={event => this.handleInputChange(event)}
          />
          <Form.Field>
            <DateInput
              name="date"
              placeholder="Event Date"
              value={date}
              iconPosition="left"
              onChange={this.handleInputChange}
              dateFormat="MM-DD-YYYY"
              closable={true}
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field>
            <label>Start Time</label>
            <TimeInput
              name="startTime"
              placeholder="Start Time"
              iconPosition="left"
              value={startTime}
              onChange={this.handleInputChange}
              timeFormat="AMPM"
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field>
            <label>End Time</label>
            <TimeInput
              name="endTime"
              placeholder="End Time"
              iconPosition="left"
              value={endTime}
              onChange={this.handleInputChange}
              timeFormat="AMPM"
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field>
            <TextArea
              name="location"
              placeholder="Event Location"
              value={location}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Grid columns={2}>
            <Grid.Column>
              <Link to={ROUTES.MANAGE_EVENTS}>
                <Button className="button-theme orange" color="orange">
                  Back
                </Button>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Button
                className="button-theme"
                disabled={isDisabled}
                onClick={this.onSubmit}
              >
                Submit
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </Container>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(CreateEventBase);
