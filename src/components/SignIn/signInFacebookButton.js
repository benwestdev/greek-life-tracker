import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Container } from "semantic-ui-react";
import { FacebookLoginButton } from "react-social-login-buttons";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import Msg from "../Message";

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
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
        <FacebookLoginButton onClick={this.onSubmit} />
        {error && <Msg error={true} content={error.message} />}
      </Container>
    );
  }
}

const SignInFacebookButton = compose(
  withRouter,
  withFirebase
)(SignInFacebookBase);

export default SignInFacebookButton;
