import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand href={props.baseLink}>
        <img
          src={require("../assets/logo.svg")}
          width="30"
          height="30"
          className="d-inline-block align-top text-white"
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="text-white m-2" to={props.rankLink}>
            Rank
          </Link>
          <Link className="text-white m-2" to={props.scrambleLink}>
            Scramble
          </Link>
          <Link className="text-white m-2" to={props.scrambleImageLink}>
            Image
          </Link>
          <Link className="text-white m-2" to={props.aboutLink}>
            About
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
