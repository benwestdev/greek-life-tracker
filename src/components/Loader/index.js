import React from "react";
import { Row, Col, Spinner } from "reactstrap";

const Loader = ({ color }) => {
  const loaderColor = color ? color : "white";
  return (
    <Row style={{ margin: "0 auto" }}>
      <Col lg="5" md="6" className="text-center">
        <Spinner
          type="grow"
          color={loaderColor}
          style={{ width: "3rem", height: "3rem" }}
        />
        <Spinner
          type="grow"
          color={loaderColor}
          style={{ width: "3rem", height: "3rem" }}
        />
        <Spinner
          type="grow"
          color={loaderColor}
          style={{ width: "3rem", height: "3rem" }}
        />
      </Col>
    </Row>
  );
};

export default Loader;
