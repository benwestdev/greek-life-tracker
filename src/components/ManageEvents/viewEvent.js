import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Dropdown,
  Button,
  TextArea,
  Grid,
  Header
} from "semantic-ui-react";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";

import { AuthUserContext, withAuthorization } from "../Session";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";

const EventView = () => <h1>Viewing an event</h1>;
export default EventView;
