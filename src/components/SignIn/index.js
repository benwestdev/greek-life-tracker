import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Container, Form, Header, Button, Divider } from "semantic-ui-react";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import Msg from "../Message";
import SignInGoogleButton from "./signInGoogleButton";
import SignInFacebookButton from "./signInFacebookButton";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

const ERROR_MSG_ACCOUNT_EXISTS = `
An account with this E-Mail address already exists.
Try to login with this account instead. If you think the
account is already used from one of the social logins, try
to sign-in with one of them. Afterward, associate your accounts
on your personal account page.
`;

const SignInPage = () => (
  <Container className="body-container">
    <Header as="h1" textAlign="center">
      Sign In
    </Header>
    <SignInForm />
    <Divider />
    <SignInGoogleButton />
    <SignInFacebookButton />
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
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

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
