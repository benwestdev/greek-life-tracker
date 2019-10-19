import React, { useState, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardTitle,
  Container
} from "reactstrap";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import * as STATUSES from "../../constants/statuses";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import CircleBanner from "../CircleBanner";
import PageHeader from "../PageHeader";
import Loader from "../Loader";

const AttendanceManagement = ({ match, firebase }) => {
  const [loading, setLoading] = useState(true);
  const [attendanceId, setAttendanceId] = useState(
    match && match.params && match.params.id ? match.params.id : null
  );
  const [attendances, setAttendances] = useState("");

  const handleAction = (status, attendanceId) => {
    const editedAttendance = {
      status
    };
    firebase.AttendanceApi.editAttendance(attendanceId, editedAttendance).then(
      response => {
        console.log(response);
        const updatedAttendances = attendances.filter(att => {
          return att.uid !== attendanceId;
        });
        console.log(updatedAttendances);
        setAttendances(updatedAttendances);
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    firebase.AttendanceApi.getAttendancesByEvent(attendanceId).then(
      attendanceResult => {
        setAttendances(attendanceResult);
        setLoading(false);
      }
    );
  }, []);

  const pageHeaderText =
    "Use this page to approve or reject attendances for this event";

  return (
    <section
      className="section section-shaped section-leg"
      style={{ minHeight: "650px" }}
    >
      <CircleBanner color="success" />
      <PageHeader title="Manage Attendances" text={pageHeaderText} />

      <div className="text-center">
        <Link to={ROUTES.MANAGE_EVENTS}>
          <Button className="mb-4" color="primary" type="button">
            Back
          </Button>
        </Link>
      </div>
      <Container fluid>
        <div className="header-body">
          <Row>
            {loading && <Loader />}
            {attendances.length > 0 &&
              attendances.map(attendance => (
                <AttendanceCard
                  attendance={attendance}
                  key={attendance.uid}
                  handleAction={handleAction}
                />
              ))}
            {attendances.length === 0 && (
              <div style={{ margin: "0 auto" }}>
                <span className="text-white">
                  No attendances ready to be approved or rejected
                </span>
              </div>
            )}
          </Row>
        </div>
      </Container>
    </section>
  );
};

const AttendanceCard = ({ attendance, handleAction }) => {
  return (
    <Col lg="6" xl="3">
      <Card className="card  shadow border-0 mb-3">
        <CardBody>
          <Row>
            <div className="col">
              <CardTitle tag="h4" className="text-uppercase text-muted mb-0">
                {attendance.username}
              </CardTitle>
              <span className="h2 font-weight-bold mb-0">
                {attendance.eventName}
              </span>
            </div>
          </Row>
          <div className="mt-1 mb-0 text-center ">
            <Button
              size="md"
              color="primary"
              onClick={() => handleAction(STATUSES.APPROVED, attendance.uid)}
            >
              Approve
            </Button>
            <Button
              size="md"
              color="danger"
              onClick={() => handleAction(STATUSES.DENIED, attendance.uid)}
            >
              Reject
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(AttendanceManagement);
