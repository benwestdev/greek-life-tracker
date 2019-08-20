import React, { Component } from "react";
import {
  Container,
  Header,
  Dimmer,
  Loader,
  Table,
  Checkbox
} from "semantic-ui-react";

import { withFirebase } from "../Firebase";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <Container>
        <Header as="h1" textAlign="center">
          Admin
        </Header>
        {loading === true && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
        <UserList users={users} />
      </Container>
    );
  }
}

const UserList = ({ users }) => (
  <Table basic="very" celled unstackable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>User</Table.HeaderCell>
        <Table.HeaderCell>Is Admin?</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {users &&
        users.map(user => (
          <Table.Row key={user.uid}>
            <Table.Cell>
              <Header as="h4" image>
                {/* <Image src='/images/avatar/small/lena.png' rounded size='mini' /> */}
                <Header.Content>
                  {user.username}
                  <Header.Subheader>{user.email}</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Checkbox
              //   checked={user.isAdmin}
              // onClick={() => handleCheckCallback(user)}
              />
            </Table.Cell>
          </Table.Row>
        ))}
    </Table.Body>
  </Table>
);

export default withFirebase(AdminPage);
