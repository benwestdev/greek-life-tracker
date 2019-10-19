import React, { useState } from "react";
import { Navbar, Container, NavbarBrand, Collapse, Row, Col } from "reactstrap";

import NavMenu from "../NavMenu";
import "./style.css";
import UserNavMenu from "../UserNavMenu";

const NavBar = () => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <Navbar className="navbar-vertical navbar-light bg-white">
      <Container className="pl-0" fluid>
        <button
          className="navbar-toggler pl-0 pr-0"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <NavbarBrand className="pt-0" tag="div">
          <i
            className="ni ni-atom mr-1 mt-3 text-purple"
            style={{ fontSize: "1.7rem" }}
          />
          <h1 style={{ display: "inline" }}>greekwise</h1>
        </NavbarBrand>
        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                {/* <Link to=""> */}
                <i
                  className="ni ni-atom mr-3 mt-2 text-purple"
                  style={{ display: "inline" }}
                />
                <h1 style={{ display: "inline" }}>greekwise</h1>
                {/* </Link> */}
              </Col>
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <NavMenu toggleCollapse={toggleCollapse} />
        </Collapse>
        <UserNavMenu />
      </Container>
    </Navbar>
  );
};

export default NavBar;
