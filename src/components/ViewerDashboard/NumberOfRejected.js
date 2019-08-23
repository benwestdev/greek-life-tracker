import React from "react";
import { Container, Header } from "semantic-ui-react";

const NumberOfRejected = ({ rejected }) => {
  if (rejected) {
    return (
      <Container style={{ marginTop: "25px" }}>
        <Header as="h3" textAlign="center">
          Number of Rejected Attendances
        </Header>
        <Container textAlign="center">
          <p style={{ fontSize: "8em", color: "red", lineHeight: ".9" }}>
            {rejected.length}
          </p>
        </Container>
      </Container>
    );
  } else return null;
};

export default NumberOfRejected;
