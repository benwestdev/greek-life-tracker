import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Button, Container, Row, Col } from "reactstrap";

const HeaderImage = ({ authUser }) => {
  return (
    <div
      className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style={{
        minHeight: "600px",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=987&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center top"
      }}
    >
      <span className="mask bg-gradient-default opacity-8" />
      <Container className="d-flex align-items-center" fluid>
        <Row>
          <Col lg="7" md="10">
            <h1 className="display-2 text-white">Hello {authUser.username}</h1>
            <p className="text-white mt-0 mb-5">
              Welcome to Greekwise. From here you can view all of your current
              point totals. You can also get some useful information about all
              upcoming events.
            </p>
            <Link to={ROUTES.EVENTS}>
              <Button color="info">See Upcoming Events</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderImage;
