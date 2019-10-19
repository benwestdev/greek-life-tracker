import React from "react";
import { Button } from "reactstrap";

const SocialLoginButton = ({ clickHandler, imageSrc, name }) => {
  return (
    <Button
      className="btn-neutral btn-icon"
      color="default"
      onClick={() => clickHandler(name)}
    >
      <span className="btn-inner--icon">
        <img alt="..." src={imageSrc} />
      </span>
      <span className="btn-inner--text">{name}</span>
    </Button>
  );
};

export default SocialLoginButton;
