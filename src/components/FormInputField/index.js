import React from "react";
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

const FormInputField = ({ iconClass, placeHolder, type, changeHandler }) => (
  <FormGroup>
    <InputGroup className="input-group-alternative">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <i className={iconClass} />
        </InputGroupText>
      </InputGroupAddon>
      <Input
        placeholder={placeHolder}
        type={type}
        onChange={e => changeHandler(e.target.value)}
      />
    </InputGroup>
  </FormGroup>
);

export default FormInputField;
