import React, { useState } from "react";
import moment from "moment";
import ViewEvent from "../ViewEvent";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

const Event = ({ event }) => {
  const [eventDetailShown, setEventDetailShown] = useState(false);
  const eventDate = moment(new Date(event.date)).format("LL");
  const eventName =
    event && event.name.length > 20
      ? event.name.substring(0, 18) + "..."
      : event.name;
  const showEvent = () => {
    setEventDetailShown(!eventDetailShown);
  };

  const icons = {
    "community service": {
      className: "icon icon-shape bg-info text-white rounded-circle shadow",
      icon: "fas fa-handshake"
    },
    sisterhood: {
      className: "icon icon-shape bg-green text-white rounded-circle shadow",
      icon: "fas fa-users"
    },
    "alpha gam": {
      className: "icon icon-shape bg-red text-white rounded-circle shadow",
      icon: "fas fa-font"
    }
  };

  return (
    <>
      <Col lg="6" xl="3">
        <Card
          className="card card-lift--hover shadow border-0 mb-3"
          onClick={() => showEvent(event)}
        >
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h4" className="text-uppercase text-muted mb-0">
                  {event.type}
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">{eventName}</span>
              </div>
              <Col className="col-auto">
                <div className={icons[event.type.toLowerCase()].className}>
                  <i className={icons[event.type.toLowerCase()].icon} />
                </div>
              </Col>
            </Row>
            <p className="mt-1 mb-0 text-lg" style={{ fontWeight: "400" }}>
              <span style={{ color: "#11cdef" }} className="mr-2">
                {eventDate}
              </span>
            </p>
          </CardBody>
        </Card>
      </Col>
      {eventDetailShown && (
        <ViewEvent
          event={event}
          showModal={eventDetailShown}
          toggleClose={showEvent}
        />
      )}
    </>
  );
};

export default Event;
