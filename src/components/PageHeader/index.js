import React from "react";
import { Container, Row, Col } from "reactstrap";

const PageHeader = ({ title, text }) => (
  <Container>
    <div className="header-body text-center mb-4 mt-0">
      <Row className="justify-content-center">
        <Col lg="5" md="6">
          <h1 className="text-white">{title}</h1>
          {text && <p className="text-white ">{text}</p>}
        </Col>
      </Row>
    </div>
  </Container>
);

export default PageHeader;
