import React from "react";
import { Icon } from "semantic-ui-react";

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <Icon name="sign-out" onClick={firebase.doSignOut} />
);

export default withFirebase(SignOutButton);
