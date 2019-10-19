import React from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import "./style.css";

const AttendanceCard = ({ attendance }) => {
  const eventName =
    attendance.eventName && attendance.eventName.length > 20
      ? attendance.eventName.substring(0, 18) + "..."
      : attendance.eventName;

  const colorClass = () => {
    const eventStatus = attendance.status.toLowerCase();
    if (eventStatus === "pending approval") {
      return "text-yellow";
    } else if (eventStatus === "denied") {
      return "text-danger";
    } else {
      return "text-success";
    }
  };

  return (
    <Col lg="6" xl="6" className="attendance-column">
      <Card className="card card-lift--hover shadow border-0 mb-3">
        <CardBody>
          <Row>
            <div className="col">
              <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                {attendance.eventType}
              </CardTitle>
              <span className="h3 font-weight-bold mb-0">{eventName}</span>
              <span className="h5 mb-0" style={{ display: "block" }}>
                {attendance.status}
              </span>
            </div>
            <Col className="col-auto">
              <h1 className={colorClass() + " display-3"}>
                {attendance.points}
              </h1>
            </Col>
          </Row>
          <p className="mt-1 mb-0 text-lg" style={{ fontWeight: "400" }}>
            <span style={{ color: "#11cdef" }} className="mr-2">
              {attendance.date}
            </span>
          </p>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AttendanceCard;
