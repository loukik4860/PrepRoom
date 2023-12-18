import { Nav, Navbar, NavDropdown,Form,Col,Button,Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../IndexComponent/staticFile/NavBar.css';
import { getToken, removeToken } from '../AuthAppComponent/Services/LocalStorage';

export function NavbarIndex() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = () => {
    removeToken();
    navigate('/Authentication');
  };

  const { access_token } = getToken();

  return (
    <div className="navBar">
      <Navbar expand="lg" variant="secondary" className='custom-navbar'>
        <Navbar.Brand href="/">InsightfulMPSC</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/home" onClick={() => setIsDropdownOpen(false)}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/category" onClick={() => setIsDropdownOpen(false)}>
              Exam
            </Nav.Link>
            <Nav.Link as={Link} to="/allblog" onClick={() => setIsDropdownOpen(false)}>
              All Blogs
            </Nav.Link>
            {access_token ?  <Nav.Link as={Link} to="/addSection" onClick={() => setIsDropdownOpen(false)}>
              Add Exam Section
            </Nav.Link> : ""}
           
            <NavDropdown
              title="Profile"
              id="basic-nav-dropdown"
              show={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {!access_token ? <NavDropdown.Item as={Link} to="/Authentication">
                Authentication
              </NavDropdown.Item>:""}
              
              {access_token ? <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item> : ""}
              {access_token ?  <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item> : ""}
             
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-4"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit"><i class="bi bi-search"></i></Button>
          </Col>
        </Row>
      </Form>
      </Navbar>
    </div>
  );
}
