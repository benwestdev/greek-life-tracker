import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Container, Form, Header, Button, Checkbox } from "semantic-ui-react";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

import Msg from "../Message";

const SignUpPage = () => (
  <Container className="body-container">
    <Header as="h1" textAlign="center">
      Sign Up
    </Header>
    <SignUpForm />
  </Container>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  type: "student",
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, type } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        const roles = {};
        if (type === "student") {
          roles[ROLES.STUDENT] = ROLES.STUDENT;
        } else if (type === "faculty") {
          roles[ROLES.VIEWER] = ROLES.VIEWER;
        }
        this.props.firebase.addUser({ username, email, roles });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = (e, { value }) => this.setState({ type: value });

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      type,
      error
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <Container>
        <Form>
          <Form.Input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <Form.Input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <Form.Input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Form.Input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <Form.Field>
            <Checkbox
              radio
              label="Are you a student?"
              name="checkboxRadioGroup"
              value="student"
              checked={type === "student"}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label="Are you a faculty member?"
              name="checkboxRadioGroup"
              value="faculty"
              checked={type === "faculty"}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button
            className="button-theme"
            onClick={this.onSubmit}
            disabled={isInvalid}
          >
            Create Account
          </Button>
          {error && <Msg error={true} timed={true} content={error.message} />}
        </Form>
      </Container>
    );
  }
}

const SignUpLink = () => (
  <Container style={{ marginTop: "35px" }}>
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up!</Link>
    </p>
  </Container>
);
const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
