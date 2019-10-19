import React, { useState } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Row, Col, Form, Button } from "reactstrap";
import * as ROUTES from "../../constants/routes";
import CircleBanner from "../CircleBanner";
import FormInputField from "../FormInputField";

const ForgotPasswordBase = ({ firebase, history }) => {
  return (
    <section
      className="section section-shaped section-lg"
      style={{ maxHeight: "500px" }}
    >
      <CircleBanner color="danger" />

      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-2">
            <div className="text-muted text-center mt-1 mb-1">
              <small>Forgot your password?</small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <ForgotPasswordForm firebase={firebase} history={history} />
          </CardBody>
        </Card>

        <Row className="mt-4 mb-6">
          <Col xs="6">
            <Link to={ROUTES.SIGN_IN} className="text-white">
              <small>Back to Login</small>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link to={ROUTES.SIGN_UP} className="text-white">
              <small>Create Account</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </section>
  );
};

const ForgotPasswordForm = ({ firebase, history }) => {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    firebase.AuthApi.doPasswordReset(email).then(history.push(ROUTES.SIGN_IN));
  };
  return (
    <Form role="form">
      <FormInputField
        iconClass="ni ni-email-83"
        placeHolder="Email"
        type="email"
        changeHandler={setEmail}
      />

      <div className="text-center">
        <Button
          className="my-4"
          color="primary"
          type="button"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

const ForgotPassword = compose(
  withRouter,
  withFirebase
)(ForgotPasswordBase);
export default ForgotPassword;
