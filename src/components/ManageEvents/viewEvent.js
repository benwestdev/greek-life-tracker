import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Divider,
  Header,
  Dimmer,
  Loader,
  Grid,
  Button
} from "semantic-ui-react";

import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { EventDetailsView } from "./eventList";
import ApprovalListSection from "./approvalList";

class EventViewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      event: {},
      attendances: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const eventUid = this.props.match.params.id;
    //TODO: add toast error handling & only grab event related fields from state when that happens
    this.props.firebase.getEvent(eventUid).then(event => {
      this.setState({
        event
      });
    });
    this.props.firebase
      .getAttendancesByEvent(eventUid)
      .then(attendances => {
        this.setState({ attendances, loading: false });
      })
      .catch(error => {
        console.log("Error getting event: ", error);
      });
  }

  handleApproveReject = (attendanceUid, status) => {
    this.props.firebase
      .editAttendance(attendanceUid, { status })
      .then(response => {
        const attendances = this.state.attendances;
        attendances.forEach(att => {
          if (att.uid === attendanceUid) {
            att.status = status;
          }
        });
        this.setState({ attendances });
      });
  };

  render() {
    const { event, attendances, loading } = this.state;
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
        <Grid columns={2}>
          <Grid.Column>
            <Link to={ROUTES.MANAGE_EVENTS}>
              <Button className="button-theme shorter orange" color="orange">
                Back
              </Button>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to={`/manageEvents/edit/${event.uid}`}>
              <Button className="button-theme shorter">Edit{event.uid}</Button>
            </Link>
          </Grid.Column>
        </Grid>
        <Divider />
        {attendances && (
          <ApprovalListSection
            event={event}
            attendances={attendances}
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
