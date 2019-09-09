import React, { Component, Fragment } from "react";
import { compose } from "recompose";
import { Container, Header, Divider, Dimmer, Loader } from "semantic-ui-react";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import * as STATUSES from "../../constants/statuses";
import PointsByUserTable from "./PointsByUserTable";
import EventPointsBarChart from "./EventPointsBarChart";
import NumberOfRejected from "./NumberOfRejected";
import AttendancesByStatusChart from "./AttendancesByStatusChart";

const pointsByEventMap = {
  [STATUSES.ALPHA_TYPE]: { name: STATUSES.ALPHA_TYPE, points: 0 },
  [STATUSES.COM_SERVICE_TYPE]: {
    name: STATUSES.COM_SERVICE_TYPE.substring(0, 12),
    points: 0
  },
  [STATUSES.SISTERHOOD_TYPE]: { name: STATUSES.SISTERHOOD_TYPE, points: 0 }
};

const attendanceByStatusMap = {
  [STATUSES.APPROVED]: { name: STATUSES.APPROVED, value: 0 },
  [STATUSES.DENIED]: {
    name: STATUSES.DENIED.substring(0, 12),
    value: 0
  },
  [STATUSES.PENDING]: { name: STATUSES.PENDING, value: 0 }
};

class ViewerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendances: [],
      pointsByUser: {},
      rejected: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.AttendanceApi.getAttendances().then(attendances => {
      this.structureData(attendances);
    });
  }

  structureData = attendances => {
    const pointsByUser = {};
    const rejected = [];
    attendances.forEach(attendance => {
      //Points By User
      if (!pointsByUser[attendance.username]) {
        pointsByUser[attendance.username] = [];
      }
      pointsByUser[attendance.username].push(attendance);
      //Points By Event
      if (attendance.status === STATUSES.APPROVED) {
        pointsByEventMap[attendance.eventType].points += Number(
          attendance.points
        );
      }
      //Attendance By Status
      attendanceByStatusMap[attendance.status].value += 1;
      //Number of Rejected
      if (attendance.status === STATUSES.DENIED) {
        rejected.push(attendance);
      }
    });
    const pointsByEvent = Object.keys(pointsByEventMap).map(
      key => pointsByEventMap[key]
    );
    const attendanceByStatus = Object.keys(attendanceByStatusMap).map(
      key => attendanceByStatusMap[key]
    );
    console.log({ attendanceByStatus });
    this.setState({
      pointsByUser,
      pointsByEvent,
      attendanceByStatus,
      rejected,
      loading: false
    });
  };

  sumPoints = (attendances, type) => {
    let count = 0;
    attendances.forEach(attendance => {
      //Get total points regardless of types
      if (type === null) {
        if (attendance.status !== STATUSES.DENIED) {
          count += Number(attendance.points);
        }
      } else {
        if (
          attendance.eventType === type &&
          attendance.status !== STATUSES.DENIED
        ) {
          count += Number(attendance.points);
        }
      }
    });
    return count;
  };

  render() {
    const {
      pointsByUser,
      pointsByEvent,
      attendanceByStatus,
      rejected,
      loading
    } = this.state;
    return (
      <Fragment>
        <Container className="body-container" style={{ marginBottom: "25px" }}>
          <Header as="h1" textAlign="center">
            Dashboard
          </Header>

          {loading && (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          )}
          <PointsByUserTable
            pointsByUser={pointsByUser}
            sumPoints={this.sumPoints}
          />
          <Divider />
        </Container>
        {pointsByEvent && <EventPointsBarChart events={pointsByEvent} />}
        <Container>
          <Divider />
        </Container>
        <NumberOfRejected rejected={rejected} />

        <Container>
          <Divider />
        </Container>
        <Container>
          {attendanceByStatus && (
            <AttendancesByStatusChart statuses={attendanceByStatus} />
          )}
        </Container>
      </Fragment>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.VIEWER];
export default compose(
  withAuthorization(condition),
  withFirebase
)(ViewerDashboard);
