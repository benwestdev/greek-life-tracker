import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Container } from "semantic-ui-react";
import { FacebookLoginButton } from "react-social-login-buttons";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import Msg from "../Message";

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
An account with an E-Mail address to
this social account already exists. Try to login from
this account instead and associate your social accounts on
your personal account page.
`;

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  onSubmit = () => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        this.props.firebase.firestore
          .collection("users")
          .doc(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: { [ROLES.STUDENT]: ROLES.STUDENT }
          });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
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
