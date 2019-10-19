import React from "react";

const CircleBanner = ({ color }) => {
  const specifiedColor = "bg-gradient-" + color;
  const baseStyle = "shape shape-style-1 shape-default";
  return (
    <div className={color ? specifiedColor + " " + baseStyle : baseStyle}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default CircleBanner;
