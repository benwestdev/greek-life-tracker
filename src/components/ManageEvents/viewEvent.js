import React, { Component } from "react";
import { Container, Divider, Header, Dimmer, Loader } from "semantic-ui-react";

import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { EventDetailsView } from "./eventList";
import { ApprovalList } from "./approvalList";

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
      this.setState({
        event: snapshot.val(),
        loading: false
      });
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
          {event.name}
        </Header>
        {loading && (
          <Dimmer>
            <Loader inverted />
          </Dimmer>
        )}
        <EventDetailsView event={event} />
        <Divider />
        <ApprovalList eventId={event.uid} />
      </Container>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(EventViewPage);
