import React, { useState } from "react";
import { Form, Button } from "reactstrap";
import FormInputField from "../FormInputField";

const ChangePasswordForm = ({ firebase }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const submitDisabled = !(
    password &&
    confirmPassword &&
    password === confirmPassword
  );

  const handleSubmit = () => {
    firebase.AuthApi.doPasswordUpdate(password).then(() => {
      setPassword("");
      setConfirmPassword("");
    });
  };

  return (
    <Form role="form">
      <FormInputField
        iconClass="ni ni-lock-circle-open"
        placeHolder="Password"
        type="password"
        changeHandler={setPassword}
      />

      <FormInputField
        iconClass="ni ni-lock-circle-open"
        placeHolder="Confirm Password"
        type="password"
        changeHandler={setConfirmPassword}
      />

      <div className="text-center">
        <Button
          className="my-4"
          color="primary"
          type="button"
          disabled={submitDisabled}
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default ChangePasswordForm;
