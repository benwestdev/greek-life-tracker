import React from "react";
import "./style.css";
const Pill = ({ dateRange, handleClick, selected }) => {
  return (
    <button
      disabled={selected}
      className="pill"
      onClick={() => handleClick(dateRange.value)}
    >
      {dateRange.name}
    </button>
  );
};

export default Pill;
