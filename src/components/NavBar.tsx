import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router";
import logo from "../assets/logo.svg";
import { routes } from "../routes";

const NavBar = () => (
  <Navbar bg="primary" expand="lg" variant="dark" sticky="top">
    <Container fluid>
      <Navbar.Brand as={Link} to={routes.base}>
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to={routes.scramble}>
            Scramble
          </Nav.Link>
          <Nav.Link as={Link} to={routes.scrambleImage}>
            Image
          </Nav.Link>
          <Nav.Link as={Link} to={routes.about}>
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
