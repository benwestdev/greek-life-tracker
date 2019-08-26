import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Card, List, Button } from "semantic-ui-react";

import WithAnimation from "../Animate";

const EventList = ({ events, onDelete }) => (
  <Container style={{ marginTop: "40px" }}>
    <Card.Group centered>
      {events.map(event => (
        <EventItem key={event.uid} event={event} onDelete={onDelete} />
      ))}
    </Card.Group>
  </Container>
);

const EventItemBase = ({ event, onDelete }) => (
  <Card className="effect6 card-list-margin">
    <Card.Content>
      <Card.Header>{event.name}</Card.Header>
      <Card.Meta content={event.type} />
      <Card.Description>
        <EventDetailsView event={event} />
      </Card.Description>
      <Link to={`/manageEvents/view/${event.uid}`}>
        <Button fluid color="linkedin" className="pad-top">
          Manage
        </Button>
      </Link>
      {/* TODO: add code to delete child objects before enabling delete */}
      {/* <Grid columns={2} style={{ marginTop: "5px" }}>
        <Grid.Column>
          <Button
            className="button-theme shorter red"
            onClick={() => onDelete(event.uid)}
          >
            Delete
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Link to={`/manageEvents/view/${event.uid}`}>
            <Button className="button-theme shorter">View/Edit</Button>
          </Link>
        </Grid.Column>
      </Grid> */}
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
const EventItem = WithAnimation(EventItemBase);
