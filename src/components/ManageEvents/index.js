import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Dimmer, Loader, Button } from "semantic-ui-react";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";
import EventList from "./eventList";
import { compose } from "recompose";

class ManageEventsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      events: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    //TODO: add toast error handling & only grab event related fields from state when that happens
    this.props.firebase.EventApi.getEvents()
      .then(events => {
        this.setState({ events, loading: false });
      })
      .catch(error => {
        this.setState({ events: [], loading: false });
      });
  }

  onDelete = uid => {
    console.log("deleting: ", uid);
    this.props.firebase.EventApi.deleteEvent(uid).then(response => {
      const events = this.state.events;
      const newEvents = events.filter(event => uid !== event.uid);
      this.setState({ events: newEvents });
    });
  };

  componentWillUnmount() {
    this.props.firebase.events().off();
  }

  render() {
    const { events, loading } = this.state;
    return (
      <Container className="body-container">
        <Header as="h1" textAlign="center">
          Manage Events
        </Header>
        <Container textAlign="center">
          <Link to={ROUTES.CREATE_EVENT}>
            <Button fluid color="green">
              Make New Event
            </Button>
          </Link>
        </Container>
        {loading && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
        {events.length > 0 ? (
          <Container>
            <EventList events={events} onDelete={this.onDelete} />
          </Container>
        ) : (
          <Container textAlign="center" style={{ marginTop: "75px" }}>
            <p style={{ fontSize: "1.5em" }}>
              No events setup yet..start making some
            </p>
          </Container>
        )}
      </Container>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(ManageEventsPage);
