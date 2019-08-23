import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { Container } from "semantic-ui-react";
import { GoogleLoginButton } from "react-social-login-buttons";

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

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  onSubmit = () => {
    return this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        this.props.firebase.firestore
          .collection("users")
          .doc(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: { [ROLES.STUDENT]: ROLES.STUDENT }
          });
        // this.props.firebase.getUser(socialAuthUser.user.uid).then(user => {
        //   if (!user) {
        //     this.props.firebase.firestore
        //       .collection("users")
        //       .doc(socialAuthUser.user.uid)
        //       .set({
        //         username: socialAuthUser.user.displayName,
        //         email: socialAuthUser.user.email,
        //         roles: { [ROLES.STUDENT]: ROLES.STUDENT }
        //       });
        //   }
        // });
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
