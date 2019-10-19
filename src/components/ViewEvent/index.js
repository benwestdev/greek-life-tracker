import React, { useState, useEffect } from "react";
import moment from "moment";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { withFirebase } from "../Firebase";
import { withAuthorization, AuthUserContext } from "../Session";
import { compose } from "recompose";
import * as ROLES from "../../constants/roles";
import EventDetail from "../EventDetail";
import "./style.css";

const ViewEventBase = ({
  event,
  showModal,
  toggleClose,
  firebase,
  authUser
}) => {
  const [attendances, setAttendances] = useState([]);
  const [userAttended, setUserAttended] = useState(null);

  useEffect(() => {
    firebase.AttendanceApi.getAttendancesByEvent(event.uid).then(res => {
      console.log(res);
      setAttendances(res);
      const userAttendance = attendances.filter(attendance => {
        return attendance.userId === authUser.uid;
      });
      userAttendance.length ? setUserAttended(true) : setUserAttended(false);
    });
    // eslint-disable-next-line
  }, [event.uid, firebase.AttendanceApi, authUser.uid]);

  const handleMarkAttended = () => {
    console.log({ authUser });
    let newAttendance = {
      date: moment().format("MM-DD-YYYY"),
      eventId: event.uid,
      eventName: event.name,
      eventType: event.type,
      points: event.points,
      status: "Pending Approval",
      userId: authUser.uid,
      username: authUser.username
    };
    firebase.AttendanceApi.addAttendance(newAttendance).then(response => {
      setUserAttended(true);
    });
  };

  return (
    <Modal isOpen={showModal} toggle={toggleClose} centered={true}>
      <ModalHeader className="modalTitle">{event.name}</ModalHeader>
      <ModalBody>
        <EventDetail event={event} />
      </ModalBody>
      <ModalFooter>
        {!userAttended && (
          <Button color="primary" onClick={handleMarkAttended}>
            Mark as Attended
          </Button>
        )}
        {userAttended && (
          <Button color="primary" disabled onClick={toggleClose}>
            You Attended!
          </Button>
        )}
        <Button color="secondary" onClick={toggleClose}>
          Back
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const ViewEvent = ({ event, showModal, toggleClose, firebase }) => (
  <AuthUserContext.Consumer>
    {authUser => (
      <ViewEventBase
        event={event}
        showModal={showModal}
        toggleClose={toggleClose}
        firebase={firebase}
        authUser={authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => authUser && !!authUser.roles[ROLES.STUDENT];
export default compose(
  withAuthorization(condition),
  withFirebase
)(ViewEvent);
