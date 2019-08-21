import React from "react";
import { Container, Header, Card, List, Button } from "semantic-ui-react";

const EventList = ({ events }) => (
  <Card.Group>
    {events.map(event => (
      <EventItem key={event.uid} event={event} />
    ))}
  </Card.Group>
);

const EventItem = ({ event }) => (
  <Card>
    <Card.Content>
      <Card.Header>{event.name}</Card.Header>
      <Card.Meta content={event.type} />
      <Card.Description>
        <EventDetailsView event={event} />
      </Card.Description>
      <div className="ui two buttons">
        {/* <Link to={`/admin/events/${event.id}`}>
              <Button basic size="tiny" color="green">
                View/Edit
              </Button>
            </Link> */}
        <Button
          basic
          size="tiny"
          color="red"
          //   onClick={() => this.handleDelete(event.id)}
        >
          Delete
        </Button>
      </div>
    </Card.Content>
  </Card>
);

const EventDetailsView = ({ event }) => (
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
          {event.startTime} - {event.endTime}
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="pin" />
        <List.Content>{event.address}</List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="percent" />
        <List.Content>{event.points} Points</List.Content>
      </List.Item>
    </List>
  </Container>
);

export default EventList;
