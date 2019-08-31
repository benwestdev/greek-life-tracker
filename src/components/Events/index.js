import React, { Component } from "react";
import { compose } from "recompose";
import { Container, Header, Loader, Checkbox } from "semantic-ui-react";
import moment from "moment";
import debounce from "lodash.debounce";

import { withFirebase } from "../Firebase";
import { withAuthorization, AuthUserContext } from "../Session";
import * as Util from "../../utils";
import * as ROLES from "../../constants/roles";
import * as STATUSES from "../../constants/statuses";

import EventList from "./eventList";

class EventsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attendances: [],
      includePastEvents: false,
      lastEventFetched: null,
      error: false,
      hasMore: true,
      loading: false,
      events: []
    };

    window.onscroll = debounce(() => {
      const {
        loadEvents,
        state: { error, loading, hasMore }
      } = this;
      Util.scrolledToBottomCallback(error, loading, hasMore, loadEvents);
    }, 100);
  }

  componentWillMount() {
    this.loadEvents();
  }

  loadEvents = () => {
    this.setState({ loading: true }, () => {
      const { lastEventFetched, includePastEvents } = this.state;
      this.props.firebase
        .getEventsPaginated(lastEventFetched, includePastEvents)
        .then(querySnapshot => {
          let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          if (!lastVisible) {
            this.setState({
              hasMore: false,
              loading: false
            });
            return;
          }

          const nextEvents = Util.convertQuerySnapshotToResults(querySnapshot);
          this.setState(
            {
              loading: false,
              events: [...this.state.events, ...nextEvents],
              lastEventFetched: lastVisible
            },
            () => {}
          );
        })
        .catch(error => {
          console.log({ error });
          this.setState({
            loading: false,
            error: error
          });
        });
    });
  };

  showPastEvents = () => {
    let { includePastEvents } = this.state;
    includePastEvents = !includePastEvents;
    this.setState({ includePastEvents: includePastEvents }, () => {
      if (includePastEvents) {
        this.loadEvents();
      }
    });
  };

  handleAttend = (event, user) => {
    const attendanceObject = {
      eventId: event.uid,
      eventName: event.name,
      eventType: event.type,
      date: moment().format("LL"),
      userId: user.uid,
      username: user.username,
      points: event.points,
      status: STATUSES.PENDING
    };
    this.props.firebase
      .addAttendance(attendanceObject)
      .then(response => {
        const attendances = this.state.attendances;
        attendances.push(attendanceObject);
        this.setState({
          attendances
        });
      })
      .catch(error => {
        console.log("Error saving attendance: ", error);
      });
  };

  render() {
    const {
      events,
      attendances,
      includePastEvents,
      loading,
      hasMore
    } = this.state;
    const filteredEvents = includePastEvents
      ? events
      : events.filter(event => event.date >= STATUSES.TODAY);

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <Container className="body-container">
            <Header as="h1" textAlign="center">
              Upcoming Events
            </Header>
            <Container></Container>
            {events.length > 0 && (
              <Container>
                <Checkbox
                  toggle
                  checked={includePastEvents}
                  onClick={this.showPastEvents}
                  label="Show Past Events"
                />
                <EventList
                  events={filteredEvents}
                  user={authUser}
                  onAttend={this.handleAttend}
                  attendances={attendances}
                />
              </Container>
            )}
            {loading && <Loader active inline="centered" />}
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
