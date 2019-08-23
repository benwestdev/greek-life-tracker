import React, { Component } from "react";
import { Container, Header, Card, Button } from "semantic-ui-react";

import * as STATUSES from "../../constants/statuses";

const ApprovalListSection = ({ event, handleApproveReject, attendances }) => (
  <Container className="body-container">
    <Header as="h1" textAlign="center">
      Approval List for 123 {event.name}
    </Header>
    <ApprovalList
      event={event}
      handleApproveReject={handleApproveReject}
      attendances={attendances}
    />
  </Container>
);

const ApprovalList = ({ event, handleApproveReject, attendances }) => (
  <Card.Group centered={true}>
    {attendances &&
      attendances
        .filter(attendance => attendance.status === STATUSES.PENDING)
        .map((attendance, index) => {
          return (
            <Card key={index}>
              <Card.Content>
                <Card.Header>{attendance.username}</Card.Header>
                <Card.Meta>{attendance.status}</Card.Meta>
                <Card.Description>
                  Give <strong>{attendance.username}</strong>
                  <strong>{" " + event.points + " "}</strong>points for
                  attending on
                  {" " + event.date}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() =>
                      handleApproveReject(attendance.uid, STATUSES.APPROVED)
                    }
                  >
                    Approve
                  </Button>
                  s
                  <Button
                    basic
                    color="red"
                    onClick={() =>
                      handleApproveReject(attendance.uid, STATUSES.DENIED)
                    }
                  >
                    Decline
                  </Button>
                </div>
              </Card.Content>
            </Card>
          );
        })}
  </Card.Group>
);

export default ApprovalListSection;
