import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Container } from "semantic-ui-react";
import { GoogleLoginButton } from "react-social-login-buttons";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import Msg from "../Message";

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {}
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  render() {
    const { error } = this.state;
    return (
      <Container>
        <GoogleLoginButton onClick={this.onSubmit} />
        {error && <Msg error={true} content={error.message} />}
      </Container>
    );
  }
}

const SignInGoogleButton = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase);

export default SignInGoogleButton;
