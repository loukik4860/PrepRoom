import { Nav, Navbar, NavDropdown, Form, Col, Button, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../IndexComponent/staticFile/NavBar.css';
import { getToken, removeToken } from '../AuthAppComponent/Services/LocalStorage';
import { useDispatch } from 'react-redux';
import { setUserToken, unsetUserToken } from '../AuthAppComponent/feature/authSlice';

export function NavbarIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = () => {
    dispatch(unsetUserToken({access_token:null}));
    removeToken();
    navigate('/Authentication');
  };

  let { access_token } = getToken();
  useEffect(()=>{
    dispatch(setUserToken({access_token:access_token}))
  },[dispatch,access_token])

  return (
    <div className="navBar">
      <Navbar expand="lg" variant="secondary" className='custom-navbar'>
        <Navbar.Brand id='navbarNav'><Nav.Link as={Link} to="/home">StudySphere</Nav.Link></Navbar.Brand>
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
            {access_token ? <Nav.Link as={Link} to="/addSection" onClick={() => setIsDropdownOpen(false)}>
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
              </NavDropdown.Item> : ""}

              {access_token ? <NavDropdown.Item as={Link} to="/authorProfile">
                Profile
              </NavDropdown.Item> : ""}
              {access_token ? <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item> : ""}

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Form >
          <Row className=" search-box align-items-center">
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Type To Search.."
                className="mr-sm-4"
              />
            </Col>
            
            <Col xs="auto">
              <Button type="submit"><i className="bi bi-search"></i></Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
    </div>
  );
}
