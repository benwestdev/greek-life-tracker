import React, { useState } from "react";
import { Button, Form } from "reactstrap";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import FormInputField from "../FormInputField";

const RegisterForm = ({ firebase, history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  const [isFaculty, setIsFaculty] = useState(false);

  const submitDisabled = !(
    password !== "" &&
    email !== "" &&
    confirmPassword !== "" &&
    firstName !== "" &&
    lastName !== "" &&
    password === confirmPassword
  );

  const handleSubmit = () => {
    const username = firstName + " " + lastName;
    console.log({ username });
    console.log({ email });
    console.log({ password });
    console.log({ confirmPassword });
    firebase.AuthApi.doCreateUserWithEmailAndPassword(email, password).then(
      authUser => {
        const roles = {};
        if (isStudent) {
          roles[ROLES.STUDENT] = ROLES.STUDENT;
        }
        if (isFaculty) {
          roles[ROLES.VIEWER] = ROLES.VIEWER;
        }

        firebase.firestore
          .collection("users")
          .doc(authUser.user.uid)
          .set({
            username,
            email,
            roles
          })
          .then(() => {
            history.push(ROUTES.HOME);
          });
      }
    );
  };

  const handleCheckboxChange = type => {
    console.log(type);
    if (type === "student") {
      setIsStudent(!isStudent);
    } else if (type === "faculty") {
      setIsFaculty(!isFaculty);
    }
  };

  return (
    <Form role="form">
      <FormInputField
        iconClass="ni ni-single-02"
        placeHolder="First Name"
        type="text"
        changeHandler={setFirstName}
      />
      <FormInputField
        iconClass="ni ni-circle-08"
        placeHolder="Last Name"
        type="text"
        changeHandler={setLastName}
      />
      <FormInputField
        iconClass="ni ni-email-83"
        placeHolder="Email"
        type="email"
        changeHandler={setEmail}
      />
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
      <FormCheckbox
        id="student"
        checkedValue={isStudent}
        changeHandler={handleCheckboxChange}
        label="Are you a student?"
      />
      <FormCheckbox
        id="faculty"
        checkedValue={isFaculty}
        changeHandler={handleCheckboxChange}
        label="Are you a faculty member?"
      />
      <div className="text-center">
        <Button
          className="my-4"
          color="primary"
          type="button"
          disabled={submitDisabled}
          onClick={() => handleSubmit()}
        >
          Create Account
        </Button>
      </div>
    </Form>
  );
};

const FormCheckbox = ({ id, checkedValue, changeHandler, label }) => (
  <div className="custom-control custom-control-alternative custom-checkbox">
    <input
      className="custom-control-input"
      id={id}
      type="checkbox"
      checked={checkedValue}
      onChange={() => changeHandler(id)}
    />
    <label className="custom-control-label" htmlFor={id}>
      <span className="text-muted">{label}</span>
    </label>
  </div>
);

export default RegisterForm;
