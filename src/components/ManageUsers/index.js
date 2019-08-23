import React, { Component } from "react";
import { Container, Header, Dimmer, Loader } from "semantic-ui-react";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import { compose } from "recompose";

import UserList from "./userList";

class ManageUsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.getUsers().then(users => {
      this.setState({ users, loading: false });
    });
  }

  handleCheckCallback = (userObject, status) => {
    if (userObject.roles && userObject.roles.hasOwnProperty(status)) {
      delete userObject.roles[status];
    } else {
      userObject.roles[status] = status;
    }

    this.props.firebase
      .editUser(userObject.uid, userObject)
      .then(response => {
        const users = this.state.users;
        users.forEach(user => {
          if (user.uid === userObject.uid) {
            user.roles = userObject.roles;
          }
        });
        this.setState({ users });
      })
      .catch(error => {
        console.log("error updating user error");
      });
  };

  render() {
    const { users, loading } = this.state;
    return (
      <Container className="body-container">
        <Header as="h1" textAlign="center">
          Manage Users
        </Header>
        {loading === true && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
        <UserList
          users={users}
          handleCheckCallback={this.handleCheckCallback}
        />
      </Container>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
export default compose(
  withAuthorization(condition),
  withFirebase
)(ManageUsersPage);
