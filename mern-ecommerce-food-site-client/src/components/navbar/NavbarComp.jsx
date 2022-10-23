import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiUser3Line, RiSearchLine } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import { addUserAuthData, removeUserAuthData } from '../../features/userAuth/userAuth'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './navbarComp.css'

const NavbarComp = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSideMenu, setShowSideMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const userAuthData = useSelector((state) => state.userAuth.userAuthData)
  const foodItemData = useSelector((state) => state.foodItem.foodItemData)


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutToast = () => toast("Wow so easy!");

  const navigateHandler = (path) => {
    setShowSideMenu(false)
    setShowUserMenu(false)
    navigate(path)
  }

  const searchHandler = (e) => {
    e.preventDefault()

    let searchTermTmp = searchTerm
    setSearchTerm("")
    setShowSideMenu(false)
    setShowUserMenu(false)
    navigate(`/search?${searchTermTmp}`)
  }

  const logoutHandler = (e) => {
    e.preventDefault()

    toast("Logout Successful")

    setShowSideMenu(false)
    setShowUserMenu(false)
    dispatch(removeUserAuthData())
  }

  // useEffect(() => {
  //   console.log("foodItemData = ", foodItemData)
  // }, [foodItemData])

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
          {(foodItemData?.length > 0) ?
            (<span className='navbarCartNos'>{foodItemData.length}</span>) : (<></>)}
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

        {/* top menu design */}
        {((showUserMenu === true) &&
          (showSideMenu === false)) ?
          ((userAuthData?._id !== undefined) ?
            (
              < div className='navbarUserMenuCont'>
                <div className='navbarUserMenuItem'>Account</div>
                <div className='navbarUserMenuItem'
                  onClick={(e) => logoutHandler(e)}>
                  Logout
                </div>
              </div>
            )
            :
            (
              < div className='navbarUserMenuCont'>
                <div className='navbarUserMenuItem'
                  onClick={() => navigateHandler('/login')}>
                  Login
                </div>
              </div>
            )) :
          (<></>)
        }

        {/* Side Menu design */}
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

        <ToastContainer
          position="top-center"
          autoClose={500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="light"
        />
      </div >
    </>

  )
}

export default NavbarComp