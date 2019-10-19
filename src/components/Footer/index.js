import React from "react";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import "./style.css";

const Footer = () => {
  return (
    <Container fluid>
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2019{" "}
              <a
                className="font-weight-bold ml-1"
                href="/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Greekwise
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" target="_blank">
                  Greekwise
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" target="_blank">
                  About Us
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" target="_blank">
                  Blog
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/" rel="noopener noreferrer" target="_blank">
                  MIT License
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    </Container>
  );
};

export default Footer;
