import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "../IndexComponent/staticFile/SubNavBar.css";

export function SubNavbar() {

  return (
    <Navbar expand="lg" bg="danger" variant="dark" className="SubNavBar">
      <div className="ms-5">
        <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
        <Navbar.Collapse id="navbarNavAltMarkup">
          <Nav className="navbar-nav">
            <Link id="navLink" to="/ga"  className="nav-link text-white">
              General Awareness
            </Link>
            <Link id="navLink"  to="/ca" className="nav-link text-white">
              Current Affairs
            </Link>
            <Link id="navLink" to="/history" className="nav-link active text-white" aria-current="page">
              History
            </Link>
            <Link id="navLink" to="/geography" className="nav-link text-white">
              Geography
            </Link>
            <Link id="navLink" to="/polity" className="nav-link text-white">
              Polity
            </Link>
            <Link id="navLink" to="/eco" className="nav-link text-white">
              Economics
            </Link>
            <Link id="navLink" to="/science" className="nav-link text-white">
              Science
            </Link>
            <Link id="navLink" to="/eng" className="nav-link text-white">
              English
            </Link>
            <Link id="navLink" to="/eng" className="nav-link text-white"></Link>
           
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
