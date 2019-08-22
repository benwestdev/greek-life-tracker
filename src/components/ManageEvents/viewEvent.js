import React, { Component } from "react";
import { Container, Divider, Header, Dimmer, Loader } from "semantic-ui-react";

import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import * as STATUSES from "../../constants/statuses";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { EventDetailsView } from "./eventList";
import ApprovalListSection from "./approvalList";

class EventViewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      event: {}
    };
  }

  componentDidMount() {
    console.log("mounting");
    this.setState({ loading: true });
    const eventUID = this.props.match.params.id;
    console.log(eventUID);

    this.props.firebase.event(eventUID).on("value", snapshot => {
      const event = snapshot.val();
      event.uid = eventUID;
      //TODO: Sort this by status/date in DB call
      if (event.attendances) {
        const attendeesList = Object.keys(event.attendances).map(key => ({
          ...event.attendances[key]
        }));
        event.attendees = attendeesList;
        const userIds = event.attendees.map(attendee => {
          const keyList = Object.keys(attendee);
          return keyList.length === 1 &&
            attendee[keyList[0]] === STATUSES.PENDING
            ? keyList[0]
            : null;
        });
        console.log({ userIds });
        const fullAttendances = [];
        if (userIds.length > 0) {
          const promises = userIds.map(userId =>
            this.props.firebase.user(userId).once("value")
          );
          Promise.all(promises).then(results => {
            results.forEach(result => {
              console.log("here");
              fullAttendances.push(result.val());
            });
            console.log("full: ", fullAttendances);
            event.fullAttendances = fullAttendances;
            console.log({ event });
            this.setState({
              event: event,
              loading: false
            });
          });
        }
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  render() {
    const { event, loading } = this.state;
    return (
      <Container className="body-container">
        <Header as="h1" textAlign="center">
          {event.name} 123
        </Header>
        {loading && (
          <Dimmer>
            <Loader inverted />
          </Dimmer>
        )}
        <EventDetailsView event={event} />
        <Divider />
        {event.fullAttendances && <ApprovalListSection event={event} />}
      </Container>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(EventViewPage);
