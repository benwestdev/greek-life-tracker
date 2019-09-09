import React, { Component } from "react";
import { Container, Form, Header, Button } from "semantic-ui-react";

import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};
const PasswordChangeSection = () => (
  <div>
    <Header as="h2" textAlign="center">
      Change Password
    </Header>
    <PasswordChangeForm />
  </div>
);

class PasswordChangeFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase.AuthApi.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"
          />
          <Form.Input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"
          />
          <Button
            fluid
            color="green"
            className="full-width-button"
            disabled={isInvalid}
            type="submit"
          >
            Change My Password
          </Button>
          {error && <p>{error.message}</p>}
        </Form>
      </Container>
    );
  }
}

const PasswordChangeForm = withFirebase(PasswordChangeFormBase);
export default PasswordChangeSection;
export { PasswordChangeForm };
