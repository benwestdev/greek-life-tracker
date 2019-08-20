import React from "react";
import { Container, Header } from "semantic-ui-react";

import PasswordChangeSection from "../PasswordChange";
const AccountPage = () => (
  <Container className="body-container">
    <Header as="h1" textAlign="center">
      My Account
    </Header>
    <PasswordChangeSection />
  </Container>
);

export default AccountPage;
