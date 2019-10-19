import React, { useState, useMemo, useEffect } from "react";
import CircleBanner from "../CircleBanner";
import EventCache from "../../components/EventCache";
import Event from "../../components/Event";
import DateFilterContainer from "../DateFilterContainer";
import PageHeader from "../PageHeader";
import Loader from "../Loader";
import { Container, Row, Col } from "reactstrap";
import "./style.css";

const EventList = ({ firebase }) => {
  const [dateRange, setDateRange] = useState("week");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(null);

  const eventCache = useMemo(() => new EventCache(setResults, setLoading), []);

  useEffect(() => {
    eventCache.changeQuery(dateRange);
    // eslint-disable-next-line
  }, []);

  const handleDateFilter = dateRange => {
    setDateRange(dateRange);
    eventCache.changeQuery(dateRange);
  };

  const pageHeaderText =
    "Use this page to see all of the upcoming events in Alpha Gamma! You can also use the filter to see events in a given time frame.";
  return (
    <div className="position-relative">
      <section className="section section-lg section-shaped pb-250">
        <CircleBanner />
        <PageHeader title="Upcoming Events" text={pageHeaderText} />
        <Container
          fluid
          style={{
            paddingRight: "0px !important",
            paddingLeft: "0px !important"
          }}
        >
          <DateFilterContainer
            dateRange={dateRange}
            handleDateFilter={handleDateFilter}
          />
          <div className="header-body">
            <Row>
              {loading && <Loader />}

              {results.length > 0 &&
                results.map(event => <Event event={event} key={event.uid} />)}

              {!loading && results.length === 0 && (
                <Row className="justify-content-center text-center ">
                  <Col lg="5" md="6">
                    <h1 className="text-white">No Events!</h1>
                    <p className="text-lead text-white">
                      Looks like there aren't any events happening at that
                      time...Try picking a different date range
                    </p>
                  </Col>
                </Row>
              )}
            </Row>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default EventList;
