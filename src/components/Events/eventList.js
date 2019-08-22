import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Card, List, Button, Grid } from "semantic-ui-react";

import * as ROUTES from "../../constants/routes";

const EventList = ({ events, userId, onAttend }) => (
  <Container style={{ marginTop: "40px" }}>
    <Card.Group centered>
      {events.map(event => (
        <EventItem
          key={event.uid}
          event={event}
          userId={userId}
          onAttend={onAttend}
        />
      ))}
    </Card.Group>
  </Container>
);

const EventItem = ({ event, userId, onAttend }) => (
  <Card>
    <Card.Content>
      <Card.Header>{event.name}</Card.Header>
      <Card.Meta content={event.type} />
      <Card.Description>
        <EventDetailsView event={event} />
      </Card.Description>
      {/* {event.attendees &&
      event.attendees.filter(att => att[userId] && att[userId]) ? (
        <Button style={{ margin: "7px" }} className="button-theme shorter">
          You attended
        </Button>
      ) : (
        <Button
          style={{ margin: "7px" }}
          className="button-theme shorter"
          onClick={() => onAttend(event, userId)}
        >
          Mark as Attended
        </Button>
      )} */}

      <Button
        style={{ margin: "7px" }}
        className="button-theme shorter"
        onClick={() => onAttend(event, userId)}
      >
        Mark as Attended
      </Button>
    </Card.Content>
  </Card>
);

const EventDetailsView = ({ event }) => {
  const startTime = event.startTime || "???";
  const endTime = event.endTime || "???";
  return (
    <Container>
      <Header as="h3">Event Info</Header>
      <List>
        <List.Item>
          <List.Icon name="group" />
          <List.Content>{event.type}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="calendar alternate outline" />
          <List.Content>{event.date}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="time" />
          <List.Content>
            {startTime} - {endTime}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="pin" />
          <List.Content>{event.location || "No location set"}</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="percent" />
          <List.Content>{event.points} Points</List.Content>
        </List.Item>
      </List>
    </Container>
  );
};

export default EventList;
export { EventDetailsView };
