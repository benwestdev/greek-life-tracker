import React, { Component } from "react";
import { Container, Header, Dimmer, Loader } from "semantic-ui-react";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
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

    this.props.firebase.events().on("value", snapshot => {
      const eventObject = snapshot.val();

      if (eventObject) {
        const eventList = Object.keys(eventObject).map(key => ({
          ...eventObject[key],
          uid: key
        }));
        this.setState({
          events: eventList,
          loading: false
        });
      } else {
        this.setState({ events: [], loading: false });
      }
    });
  }

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
        {loading && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
        {events.length > 0 ? (
          <EventList events={events} />
        ) : (
          <Container textAlign="center">
            <p>No events setup!</p>
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
