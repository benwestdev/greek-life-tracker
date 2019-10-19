import React from "react";
import moment from "moment";
import { ListGroup, ListGroupItem } from "reactstrap";

const EventDetail = ({ event }) => {
  const startTime = event.startTime || "???";
  const endTime = event.endTime || "???";
  const eventDate = moment(new Date(event.date)).format("LL");

  return (
    <ListGroup>
      <EventDetailItem
        iconClass="ni ni-paper-diploma text-blue"
        data={event.type}
      />
      <EventDetailItem
        iconClass="ni ni-calendar-grid-58 text-red"
        data={eventDate}
      />
      <EventDetailItem
        iconClass="ni ni-time-alarm text-purple"
        data={startTime + " - " + endTime}
      />
      <EventDetailItem
        iconClass="ni ni-pin-3 text-green"
        data={event.location || "No location given"}
      />
      <EventDetailItem
        iconClass="ni ni-chart-bar-32 text-yellow"
        data={event.points + " Points"}
      />
    </ListGroup>
  );
};

const EventDetailItem = ({ iconClass, data }) => (
  <ListGroupItem className="list-item-row ">
    <div className="list-item-column list-item-icon">
      <i className={iconClass} />
    </div>
    <div className="list-item-column">
      <span>{data}</span>
    </div>
  </ListGroupItem>
);

export default EventDetail;
