import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const LoginLinks = ({ text, route }) => {
  return (
    <Row className="mt-4 mb-6">
      <Col xs="6">
        <Link to={ROUTES.PASSWORD_FORGET}>
          <small className="text-white">Forgot password?</small>
        </Link>
      </Col>
      <Col className="text-right" xs="6">
        <Link to={route}>
          <small className="text-white">{text}</small>
        </Link>
      </Col>
    </Row>
  );
};

export default LoginLinks;
