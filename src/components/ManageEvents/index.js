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
        <Container textAlign="center">
          <Link to={ROUTES.CREATE_EVENT}>
            <Button className="button-theme smaller">Make new event!</Button>
          </Link>
        </Container>
        {loading && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
        {events.length > 0 ? (
          <EventList events={events} />
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
