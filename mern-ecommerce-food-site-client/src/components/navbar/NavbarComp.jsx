import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

import './navbarComp.css'

const NavbarComp = () => {
  const navigate = useNavigate()

  const navigateHandler = (path) => {
    console.log(path);
    navigate(path)
  }

  return (
    <>
      <Navbar bg="light" expand="lg">

        <Container >
          <Navbar.Brand href="#">Food Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>

              <Nav.Link onClick={() => navigateHandler("/pizza")}>Pizzas</Nav.Link>
              <Nav.Link onClick={() => navigateHandler("/burger")}>Burgers</Nav.Link>
              <Nav.Link onClick={() => navigateHandler("/pasta")}>Pasta</Nav.Link>
              <Nav.Link onClick={() => navigateHandler("/beverage")}>Beverages</Nav.Link>

            </Nav>

            <Form className="d-flex mr">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search" />

              <Button variant="outline-success">Search</Button>
            </Form>

          </Navbar.Collapse >
        </Container >

      </Navbar >

    </>

  )
}

export default NavbarComp