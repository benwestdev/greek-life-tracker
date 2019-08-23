import React, { Component } from "react";
import { Container, Header, Dimmer, Loader, Button } from "semantic-ui-react";
import moment from "moment";

import { withFirebase } from "../Firebase";
import { withAuthorization, AuthUserContext } from "../Session";
import * as ROLES from "../../constants/roles";
import * as STATUSES from "../../constants/statuses";
import EventList from "./eventList";
import { compose } from "recompose";

class EventsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      allEvents: [],
      attendances: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    //TODO: add error handling with toasts and decide if we want to show all events or just upcoming etc....
    this.props.firebase
      .getEvents()
      .then(events => {
        this.setState({ allEvents: events, loading: false });
      })
      .catch(error => {
        console.log("Error getting events: ", error);
        this.setState({ allEvents: [], loading: false });
      });
    this.props.firebase
      .getAttendanceByUser(this.props.authUser.uid)
      .then(attendances => {
        this.setState({ attendances });
      });
  }

  handleAttend = (event, user) => {
    console.log(event);
    console.log(user);
    const attendanceObject = {
      eventId: event.uid,
      eventName: event.name,
      date: moment().format("LL"),
      userId: user.uid,
      username: user.username,
      points: event.points,
      status: STATUSES.PENDING
    };
    this.props.firebase
      .addAttendance(attendanceObject)
      .then(response => {
        console.log("success");
      })
      .catch(error => {
        console.log("Error saving attendance: ", error);
      });
  };

  render() {
    const { allEvents, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <Container className="body-container">
            <Header as="h1" textAlign="center">
              All Events
            </Header>
            {loading && (
              <Dimmer active inverted>
                <Loader inverted />
              </Dimmer>
            )}
            {allEvents.length > 0 ? (
              <Container>
                <EventList
                  events={allEvents}
                  user={authUser}
                  onAttend={this.handleAttend}
                />
              </Container>
            ) : (
              <p>Events to attend</p>
            )}
          </Container>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.STUDENT];
export default compose(
  withAuthorization(condition),
  withFirebase
)(EventsPage);
