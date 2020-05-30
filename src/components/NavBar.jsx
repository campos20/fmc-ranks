import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = (props) => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark" fixedTop>
      <Navbar.Brand href={props.baseLink}>
        <img
          src={require("../assets/logo.svg")}
          width="30"
          height="30"
          className="d-inline-block align-top text-white"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="text-white" href={props.rankLink}>
            Rank
          </Nav.Link>
          <Nav.Link className="text-white" href={props.scrambleLink}>
            Scramble
          </Nav.Link>
          <Nav.Link className="text-white" href={props.scrambleImageLink}>
            Image
          </Nav.Link>
          <Nav.Link className="text-white" href={props.aboutLink}>
            About
          </Nav.Link>
          <Nav.Link className="text-white" href={props.legacyLink}>
            Legacy
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
