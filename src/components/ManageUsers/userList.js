import React from "react";
import { Header, Table, Checkbox } from "semantic-ui-react";

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

export default UserList;
