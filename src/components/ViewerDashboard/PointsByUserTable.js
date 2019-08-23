import React from "react";
import { Container, Header, Table } from "semantic-ui-react";

import * as STATUSES from "../../constants/statuses";

const PointsByUserTable = ({ pointsByUser, sumPoints }) => (
  <Container style={{ marginTop: "25px" }}>
    <Header as="h3" textAlign="center">
      Points By User
    </Header>
    <Table basic="very" unstackable={true}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Student</Table.HeaderCell>
          <Table.HeaderCell>AG</Table.HeaderCell>
          <Table.HeaderCell>Service</Table.HeaderCell>
          <Table.HeaderCell>Sisterhood</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {pointsByUser &&
          Object.keys(pointsByUser).map(key => (
            <Table.Row key={key}>
              <Table.Cell>
                <Header as="h4">{key}</Header>
              </Table.Cell>
              <Table.Cell className="center">
                {sumPoints(pointsByUser[key], STATUSES.ALPHA_TYPE)}
              </Table.Cell>
              <Table.Cell className="center">
                {sumPoints(pointsByUser[key], STATUSES.COM_SERVICE_TYPE)}
              </Table.Cell>
              <Table.Cell className="center">
                {sumPoints(pointsByUser[key], STATUSES.SISTERHOOD_TYPE)}
              </Table.Cell>
              <Table.Cell className="center" style={{ fontWeight: "bold" }}>
                {sumPoints(pointsByUser[key], null)}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  </Container>
);

export default PointsByUserTable;
