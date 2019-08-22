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
    this.setState({ loading: true });
    const eventUid = this.props.match.params.id;
    //TODO: add toast error handling & only grab event related fields from state when that happens
    this.props.firebase
      .getEvent(eventUid)
      .then(event => {
        this.setState({ event });
      })
      .catch(error => {
        console.log("Error getting event: ", error);
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  handleApproveReject = () => {
    console.log("approving or rejecting");
  };

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
        {event.fullAttendances && (
          <ApprovalListSection
            event={event}
            handleApproveReject={this.handleApproveReject}
          />
        )}
      </Container>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(EventViewPage);
