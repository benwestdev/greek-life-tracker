import React from "react";
import { Container, Header, Card, List, Button } from "semantic-ui-react";

const EventList = ({ events, user, attendances, onAttend }) => (
  <Container style={{ marginTop: "40px" }}>
    <Card.Group centered>
      {events.map(event => (
        <EventItem
          key={event.uid}
          event={event}
          user={user}
          onAttend={onAttend}
          attendances={attendances}
        />
      ))}
    </Card.Group>
  </Container>
);

const EventItem = ({ event, user, attendances, onAttend }) => (
  <Card className="effect6">
    <Card.Content>
      <Card.Header>{event.name}</Card.Header>
      <Card.Meta content={event.type} />
      <Card.Description>
        <EventDetailsView event={event} />
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
