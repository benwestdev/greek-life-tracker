import React, { Component } from "react";
import { Container, Header, Card, Button } from "semantic-ui-react";

import * as STATUSES from "../../constants/statuses";

const ApprovalListSection = ({ event, handleApproveReject }) => (
  <Container className="body-container">
    <Header as="h1" textAlign="center">
      Approval List for 123 {event.name}
    </Header>
    <ApprovalList event={event} handleApproveReject={handleApproveReject} />
  </Container>
);

const ApprovalList = ({ event, handleApproveReject }) => (
  <Card.Group centered={true}>
    {event.fullAttendances &&
      event.fullAttendances.map((attendance, index) => {
        return (
          <Card key={index}>
            <Card.Content>
              {/* <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' /> */}
              {/* <Card.Header>{attendance.username}</Card.Header> */}
              {/* <Card.Meta>{attendance.status}</Card.Meta> */}
              <Card.Description>
                {/* Give <strong>{attendance.username}</strong> */}
                <strong>{" " + event.points + " "}</strong>points for attending
                on
                {" " + event.date}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  basic
                  color="green"
                  onClick={() => handleApproveReject()}
                >
                  Approve
                </Button>
                s
                <Button
                  basic
                  color="red"
                  // onClick={() =>
                  //   props.handleApproveReject(
                  //     attendance.id,
                  //     "Rejected"
                  //   )
                  // }
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
