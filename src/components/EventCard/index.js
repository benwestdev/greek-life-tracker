import React, { useState, useEffect } from "react";
import {
  Card,
  Transition,
  Modal,
  Button,
  Image,
  Icon
} from "semantic-ui-react";
import { withFirebase } from "../../components/Firebase";
import { withAuthorization } from "../../components/Session";
import { compose } from "recompose";
import * as ROLES from "../../constants/roles";
import "./style.css";

const EventCard = ({ event, firebase }) => {
  const [eventDetailShown, setEventDetailShown] = useState(false);

  const showEvent = () => {
    setEventDetailShown(true);
  };

  return (
    <>
      <Transition
        visible={event != null}
        transitionOnMount={true}
        animation="fly down"
        duration={500}
      >
        <div>
          {/* <Button className="eventIcon">
            <Button.Content visible>
              <Icon name="shop" size="big" />
            </Button.Content>
          </Button> */}
          <Card
            className="eventCard level-3"
            onClick={() => showEvent(event)}
            raised={true}
          >
            <Card.Content>
              <Card.Header>
                {event.name}
                {/* <Icon name="ellipsis vertical" style={{ float: "right" }} /> */}
              </Card.Header>
              <Card.Meta>{event.type}</Card.Meta>
              <Card.Description>{event.date}</Card.Description>
            </Card.Content>
          </Card>
        </div>
      </Transition>
      <ViewEventModal
        event={event}
        showModal={eventDetailShown}
        closeModalHandler={setEventDetailShown}
        firebase={firebase}
      />
    </>
  );
};

const ViewEventModal = ({ event, showModal, closeModalHandler, firebase }) => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    firebase.AttendanceApi.getAttendancesByEvent(event.uid).then(response => {
      console.log(response);
      setAttendances(response);
    });
  }, []);

  return (
    <Transition visible={showModal} animation="swing right" duration={500}>
      <Modal
        closeIcon={<Icon name="close" color="black" />}
        onClose={() => closeModalHandler(false)}
        open={showModal}
        dimmer={"inverted"}
        closeOnDimmerClick={true}
        content={EventDetailCard}
        size="tiny"
      ></Modal>
    </Transition>
  );
};

const EventDetailCard = () => (
  <Card style={{ margin: "0px" }}>
    <Image
      src="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2018/01/15155312/iStock-667709450.jpg"
      wrapped
      ui={false}
    />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className="date">Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="user" color={"black"} />
        22 Friends
      </a>
    </Card.Content>
  </Card>
);

const condition = authUser => authUser && !!authUser.roles[ROLES.STUDENT];
export default compose(
  withAuthorization(condition),
  withFirebase
)(EventCard);
