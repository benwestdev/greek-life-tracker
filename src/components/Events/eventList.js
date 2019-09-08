import React from "react";
import { Container, Card } from "semantic-ui-react";

import EventCard from "./EventCard";

const EventList = ({ events, user, attendances, onAttend }) => (
  <Container className="card-container">
    <Card.Group centered>
      {events.map(event => (
        <EventCard
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

export default EventList;
