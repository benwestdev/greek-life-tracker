import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Container, Form, Header, Button } from "semantic-ui-react";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import Msg from "../Message";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";

const SignInPage = () => (
  <Container className="body-container">
    <Header as="h1" textAlign="center">
      Sign In
    </Header>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </Container>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: ""
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = () => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";

    return (
      <Container>
        <Form>
          <Form.Input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <Form.Input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Button
            className="button-theme"
            disabled={isInvalid}
            onClick={this.onSubmit}
          >
            Login In
          </Button>
          {error && <Msg content={error.message} error={true} />}
        </Form>
      </Container>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);
export default SignInPage;
export { SignInForm };
