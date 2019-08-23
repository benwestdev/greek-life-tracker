import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Header, Button } from "semantic-ui-react";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import Msg from "../Message";

const PasswordForgetPage = () => (
  <Container className="body-container">
    <Header as="h1" textAlign="center">
      Forgot Password?
    </Header>
    <PasswordForgetForm />
  </Container>
);

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = () => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";
    return (
      <Container>
        <Form>
          <Form.Input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <Button
            fluid
            color="green"
            className="full-width-button"
            disabled={isInvalid}
            onClick={this.onSubmit}
          >
            Reset My Password
          </Button>
          {error && <Msg content={error.message} />}
        </Form>
      </Container>
    );
  }
}

const PasswordForgetLink = () => (
  <Container style={{ marginTop: "35px" }}>
    <p>
      Forgot Password? <Link to={ROUTES.PASSWORD_FORGET}>Click Here!</Link>
    </p>
  </Container>
);

export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };
