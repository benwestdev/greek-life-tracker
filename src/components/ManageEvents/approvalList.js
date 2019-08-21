import React, { Component } from "react";
import { Container, Header, Dimmer, Loader } from "semantic-ui-react";

export class ApprovalList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      approvals: []
    };
  }

  render() {
    // const { approvals, loading } = this.state;
    return (
      <Container className="body-container">
        <Header as="h1" textAlign="center">
          Approval List for ({this.props.eventId})
        </Header>
        {}
      </Container>
    );
  }
}
const ApprovalListPage = () => <h1>Approval Page</h1>;
export default ApprovalListPage;
