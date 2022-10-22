import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import CartIcon from '../cartIcon/CartIcon'

import { GiHamburgerMenu } from 'react-icons/gi'

import './navbarComp.css'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiUser3Line, RiSearchLine } from 'react-icons/ri'

const NavbarComp = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSideMenu, setShowSideMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const navigate = useNavigate()

  const navigateHandler = (path) => {
    setShowSideMenu(false)
    navigate(path)
  }

  const searchHandler = (e) => {
    e.preventDefault()

    let searchTermTmp = searchTerm
    setSearchTerm("")
    setShowSideMenu(false)
    navigate(`/search?${searchTermTmp}`)
  }

  // useEffect(() => {
  //   console.log(showUserMenu)
  // }, [showUserMenu])

  return (
    <>
      <div className='navbarMcomp'>
        <div className='navbarLinkListCont'>

          <div className='navbarLogoCont'>
            <img className='navbarLogoImage'
              src="https://www.pizzahut.co.in/_next/static/static/images/logo.38f9109e24d22d58d048837b27f54390.png" alt="" />
          </div>

          <ul className='navbarLinkContLarge'>
            <li className='navbarLink' onClick={() => navigateHandler("/pizza")}>Pizzas</li>
            <li className='navbarLink' onClick={() => navigateHandler("/sides")}>Sides</li>
            <li className='navbarLink' onClick={() => navigateHandler("/desserts")}>Desserts</li>
            <li className='navbarLink' onClick={() => navigateHandler("/drinks")}>Drinks</li>
          </ul>

          <form className='navbarSearchCont'
            onSubmit={(e) => searchHandler(e)}>
            <input
              className='navbarSearchContSearch'
              type="search" name="search" id="search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            < RiSearchLine
              onClick={(e) => searchHandler(e)}
              className='navbarSearchIcon' />
          </form>
        </div>

        <div className='navbarCartIconCont'>
          <AiOutlineShoppingCart />
          <span className='navbarCartNos'>3</span>
        </div>


        <GiHamburgerMenu
          className='navbarBurgerIcon'
          onClick={() => {
            setShowUserMenu(false)
            setShowSideMenu(val => !val)
          }} />


        {/* Only open user dropdown if side menu is off */}
        <RiUser3Line
          className='navbarUserIcon'
          onClick={() => {
            if (showSideMenu === false) {
              setShowUserMenu(val => !val)
            }
          }} />


        {((showUserMenu === true) &&
          (showSideMenu === false)) &&
          <div className='navbarUserMenuCont'>
            <div className='navbarUserMenuItem'>Login</div>
          </div>
        }

        {(showSideMenu === true) &&
          <div className='navbarSideCont'>

            <form className='navbarSearchContSmall'
              onSubmit={(e) => searchHandler(e)}>
              <input type="search" name="search" id="search"
                onChange={(e) => setSearchTerm(e.target.value)} />
              < RiSearchLine className='navbarSearchIcon'
                onClick={(e) => searchHandler(e)} />
            </form>

            <ul className='navbarLinkContSmall'>
              <li className='navbarLinkSmall' onClick={() => navigateHandler("/pizza")}>Pizzas</li>
              <li className='navbarLinkSmall' onClick={() => navigateHandler("/sides")}>Sides</li>
              <li className='navbarLinkSmall' onClick={() => navigateHandler("/desserts")}>Desserts</li>
              <li className='navbarLinkSmall' onClick={() => navigateHandler("/drinks")}>Drinks</li>
            </ul>

          </div>


        }
      </div >
    </>

  )
}

export default NavbarComp