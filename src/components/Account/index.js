import React from "react";
import { Container, Header, Divider } from "semantic-ui-react";

import { AuthUserContext, withAuthorization } from "../Session";
import PasswordChangeSection from "../PasswordChange";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Container className="body-container">
        <Header as="h1" textAlign="center" style={{ marginBottom: "25px" }}>
          My Account
          <Header.Subheader>{authUser.email}</Header.Subheader>
        </Header>
        <PasswordChangeSection />
        <Divider />
      </Container>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);
