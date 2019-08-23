import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const EventPointsBarChart = ({ events }) => (
  <Fragment>
    <Header as="h3" textAlign="center">
      Event Points By Type
    </Header>
    <BarChart
      width={400}
      height={200}
      data={events}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="points" fill="#00b16a" />
    </BarChart>
  </Fragment>
);

export default EventPointsBarChart;
