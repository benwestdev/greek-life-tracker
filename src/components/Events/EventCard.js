import React from "react";
import { Card, Button, Icon, Popup } from "semantic-ui-react";

import { TODAY } from "../../constants/statuses";
import WithAnimation from "../Animate";
import EventDetails from "./EventDetails";

const EventCardBase = ({ event, user, attendances, onAttend }) => (
  <Card className="effect6 card-list-margin">
    <Card.Content>
      {event.date === TODAY && (
        <Popup
          content="Event is happening today!"
          position="top center"
          style={{ float: "right" }}
          basic
          on="hover"
          trigger={
            <Icon
              style={{ float: "right", color: "orange" }}
              name="star"
              size="big"
            />
          }
        />
      )}
      <Card.Header>{event.name}</Card.Header>
      <Card.Meta content={event.type} />
      <Card.Description>
        <EventDetails event={event} />
      </Card.Description>
      {attendances &&
      attendances.filter(
        att => att.userId === user.uid && att.eventId === event.uid
      ).length > 0 ? (
        <Button
          fluid
          color="green"
          className="full-button-width pad-top"
          disabled={true}
        >
          You Attended!
        </Button>
      ) : (
        <Button
          fluid
          color="linkedin"
          className="full-button-width pad-top"
          onClick={() => onAttend(event, user)}
        >
          Mark as Attended
        </Button>
      )}
    </Card.Content>
  </Card>
);

const EventCard = WithAnimation(EventCardBase);
export default EventCard;
