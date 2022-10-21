import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import './navbarComp.css'

const NavbarComp = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const navigate = useNavigate()

  const navigateHandler = (path) => {
    // setSearchTerm("")
    navigate(path)
  }

  const searchHandler = (e) => {
    e.preventDefault()

    let searchTermTmp = searchTerm
    // console.log("searchTermTmp = ", searchTermTmp);
    setSearchTerm("")
    navigate(`/search?${searchTermTmp}`)
  }

  return (
    <>
      <div className='navbarMcomp'>
        <Navbar bg="light" expand="lg">

          <Container >
            <Navbar.Brand href="#">Food Shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '150px' }}
                navbarScroll>

                <Nav.Link onClick={() => navigateHandler("/pizza")}>Pizzas</Nav.Link>
                <Nav.Link onClick={() => navigateHandler("/sides")}>Sides</Nav.Link>
                <Nav.Link onClick={() => navigateHandler("/desserts")}>Desserts</Nav.Link>
                <Nav.Link onClick={() => navigateHandler("/drinks")}>Drinks</Nav.Link>

                <Form className="d-flex mr"
                  onSubmit={(e) => searchHandler(e)} >

                  <input
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <Button variant="outline-success"
                    onClick={(e) => searchHandler(e)}
                  >Search</Button>
                </Form>
              </Nav>

              <li className=" nav-item pe-3">
                <a href="" className="fas fa-shopping-bag">
                  <span className="num rounded-circle">3</span>
                </a>
              </li>

            </Navbar.Collapse >

          </Container >

        </Navbar >
      </div >
    </>

  )
}

export default NavbarComp