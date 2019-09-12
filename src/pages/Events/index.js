import React, { useState, useMemo, useEffect } from "react";
import { compose } from "recompose";
import EventCache from "../../components/EventCache";
import * as ROLES from "../../constants/roles";
import { Container, Header, Loader, List, Card } from "semantic-ui-react";
import { withFirebase } from "../../components/Firebase";
import { withAuthorization } from "../../components/Session";
import Msg from "../../components/Message";
import Pill from "../../components/Pill";
import EventCard from "../../components/EventCard";

const NewEventsPage = ({ firebase }) => {
  const [dateRange, setDateRange] = useState("today");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(null);

  const eventCache = useMemo(() => new EventCache(setResults, setLoading), []);

  useEffect(() => {
    eventCache.changeQuery(dateRange);
  }, []);

  const handleDateFilter = dateRange => {
    setDateRange(dateRange);
    eventCache.changeQuery(dateRange);
  };

  let dateHeaderTest;

  switch (dateRange) {
    case "year":
      dateHeaderTest = "All Events";
      break;
    case "week":
      dateHeaderTest = "Events Happening This Week";
      break;
    case "month":
      dateHeaderTest = "Events Happening This Month";
      break;
    default:
      dateHeaderTest = "Events Happening Today";
  }

  return (
    <Container style={{ marginTop: "125px" }}>
      <Container textAlign="center">
        <Pill
          dateRange={{ name: "Today", value: "today" }}
          handleClick={handleDateFilter}
          selected={dateRange === "today" ? true : false}
        />
        <Pill
          dateRange={{ name: "This Week", value: "week" }}
          handleClick={handleDateFilter}
          selected={dateRange === "week" ? true : false}
        />
        <Pill
          dateRange={{ name: "This Month", value: "month" }}
          handleClick={handleDateFilter}
          selected={dateRange === "month" ? true : false}
        />
        <Pill
          dateRange={{ name: "All", value: "year" }}
          handleClick={handleDateFilter}
          selected={dateRange === "year" ? true : false}
        />
      </Container>
      <Container style={{ marginTop: "35px" }} className="eventsContainer">
        <Header as="h3" textAlign="center" style={{ marginBottom: "40px" }}>
          {dateHeaderTest}
        </Header>
        <Card.Group centered>
          {results &&
            results.map(event => {
              return <EventCard event={event} key={event.uid} />;
            })}
          {results.length === 0 && <p>No Events!</p>}
        </Card.Group>
      </Container>
      {loading && <Loader active inline="centered" />}
    </Container>
  );
};

const condition = authUser => authUser && !!authUser.roles[ROLES.STUDENT];
export default compose(
  withAuthorization(condition),
  withFirebase
)(NewEventsPage);
