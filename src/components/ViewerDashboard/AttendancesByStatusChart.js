import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";

import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#00b16a", "#d64541", "#ffcb05", "#f39c12"];

const AttendancesByStatusChart = ({ statuses }) => (
  <Fragment>
    <Header as="h3" textAlign="center">
      Attendance By Status
    </Header>
    <PieChart width={350} height={350}>
      <Legend verticalAlign="bottom" height={115} />
      <Pie
        data={statuses}
        dataKey="value"
        cx={175}
        cy={100}
        label={true}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
      >
        {statuses.map((entry, index) => (
          <Cell fill={COLORS[index % COLORS.length]} key={index} />
        ))}
      </Pie>
    </PieChart>
  </Fragment>
);

export default AttendancesByStatusChart;
