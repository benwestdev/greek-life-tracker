import React from "react";
import { Button } from "reactstrap";

const DateFilterContainer = ({ dateRange, handleDateFilter }) => (
  <div>
    <div className="d-flex justify-content-around mb-5">
      <Button
        color={dateRange === "today" ? "info" : "default"}
        onClick={() => handleDateFilter("today")}
        size="sm"
      >
        Today
      </Button>
      <Button
        color={dateRange === "week" ? "info" : "default"}
        onClick={() => handleDateFilter("week")}
        size="sm"
      >
        This Week
      </Button>
      <Button
        color={dateRange === "month" ? "info" : "default"}
        onClick={() => handleDateFilter("month")}
        size="sm"
      >
        This Month
      </Button>
      <Button
        color={dateRange === "year" ? "info" : "default"}
        onClick={() => handleDateFilter("year")}
        size="sm"
      >
        All Events
      </Button>
    </div>
  </div>
);

export default DateFilterContainer;
