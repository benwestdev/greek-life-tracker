import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";
import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

const LoginForm = ({ firebase, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    firebase.AuthApi.doSignInWithEmailAndPassword(email, password).then(() => {
      history.push(ROUTES.HOME);
    });
  };

  return (
    <Form role="form">
      <FormGroup className="mb-3">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Email"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-lock-circle-open" />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </InputGroup>
      </FormGroup>
      <div className="text-center">
        <Button
          className="my-4"
          color="primary"
          type="button"
          onClick={() => handleSubmit()}
        >
          Sign in
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
