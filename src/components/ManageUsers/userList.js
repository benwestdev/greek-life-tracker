import React from "react";
import { Header, Table, Checkbox } from "semantic-ui-react";

import * as ROLES from "../../constants/roles";

const UserList = ({ users, handleCheckCallback }) => (
  <Table basic="very" celled unstackable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>User</Table.HeaderCell>
        <Table.HeaderCell>Is Student?</Table.HeaderCell>
        <Table.HeaderCell>Is Viewer?</Table.HeaderCell>
        <Table.HeaderCell>Is Admin?</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {users &&
        users.map(user => (
          <Table.Row key={user.uid}>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>
                  {user.username}
                  <Header.Subheader>{user.email}</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Checkbox
                checked={
                  user.roles && user.roles.hasOwnProperty([ROLES.STUDENT])
                }
                onClick={() => handleCheckCallback(user, ROLES.STUDENT)}
              />
            </Table.Cell>
            <Table.Cell>
              <Checkbox
                checked={
                  user.roles && user.roles.hasOwnProperty([ROLES.VIEWER])
                }
                onClick={() => handleCheckCallback(user, ROLES.VIEWER)}
              />
            </Table.Cell>
            <Table.Cell>
              <Checkbox
                checked={user.roles && user.roles.hasOwnProperty([ROLES.ADMIN])}
                onClick={() => handleCheckCallback(user, ROLES.ADMIN)}
              />
            </Table.Cell>
          </Table.Row>
        ))}
    </Table.Body>
  </Table>
);

export default UserList;
