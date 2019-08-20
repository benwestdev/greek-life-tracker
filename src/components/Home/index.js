import React from "react";
import { Container, Header } from "semantic-ui-react";

import { withAuthorization } from "../Session";

const HomePage = () => (
  <Container className="body-container">
    <Header as="h1" textAlign="center">
      Home Page
    </Header>
  </Container>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
