import React from 'react'
import { useState } from 'react'
import './userAccount.css'

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { addUserAuthData, removeUserAuthData } from '../../features/userAuth/userAuth'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';


const UserAccount = () => {
  const [leftMenu, setLeftMenu] = useState("address")
  const [regError, setRegError] = useState({ errPresent: false, errMsg: "" })

  const userAuthData = useSelector((state) => state.userAuth.userAuthData)


  const [regData, setRegData] = useState({
    userId: "", username: "", password: "", passwordReEnter: "",
    addressLine1: "", addressLine2: "", city: "", state: "",
    email: "", phone: ""
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // {
    //   "_id": "63544f5dc6060a6e47cecd01",
    //   "username": "u3",
    //   "addressLine1": "flat no 1,123 street,",
    //   "addressLine2": "near main shop",
    //   "city": "city 1",
    //   "state": "state 1",
    //   "email": "u3@u3.com",
    //   "phone": "123456789"
    // }

    setRegData({
      username: userAuthData._id,
      password: "",
      passwordReEnter: "",
      addressLine1: userAuthData.addressLine1,
      addressLine2: userAuthData.addressLine2,
      city: userAuthData.city,
      state: userAuthData.state,
      email: userAuthData.email,
      phone: userAuthData.phone
    })
  }, [userAuthData])


  const userSignUpHandler = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post("/user/register/", regData)
      // Clear error message
      setRegError({ errPresent: false, errMsg: "" })

      if (resp.data?._id !== undefined) {
        // Login Successful, put this user data in redux store
        dispatch(addUserAuthData(resp.data))

        toast("Sign-Up Successful")

        // Navigate to home page
        navigate('/')
      }
    } catch (error) {
      if (error.response.data.message?.match('E11000')) {
        if ((error.response.data.message?.match('email_1 dup'))) {
          setRegError({ errPresent: true, errMsg: "Error - Email already in use" })
          toast("Error - Email already in use")
        } else if ((error.response.data.message?.match('phone_1 dup'))) {
          setRegError({ errPresent: true, errMsg: "Error - Phone already in use" })
          toast("Error - Phone number already in use")
        }
        window.scrollTo(0, 0)
      }
    }
  }

  return (
    <div>
      <div className='pageMcont'>
        <div className='pageCont'>

          <div className='uAccMCont'>
            <div className='uAccLeftCont'>
              <div className='uAccLeftContTitle'
                onClick={() => setLeftMenu("orders")}
              >Past Orders</div>

              <div className='uAccLeftContTitle'
                onClick={() => setLeftMenu("password")}
              >Change Password</div>
              <div className='uAccLeftContTitle'
                onClick={() => setLeftMenu("address")}
              >Change Address</div>
            </div>

            <div className='uAccrightMCont'>

              <div className='uAccrightCont'>
                {(leftMenu === "orders") &&
                  <div>
                    orders

                  </div>
                }
                {(leftMenu === "password") &&
                  <div className='uAccEditCont'>
                    <label htmlFor="password">New Password<span className='uAccRequired'>*</span></label>
                    <input
                      onChange={(e) => setRegData((prev) => ({ ...prev, password: e.target.value }))}
                      // value={regData.password}
                      type="password" name="password" id="password" required />

                    <label htmlFor="passwordRe">Re-type New Password</label>
                    <input
                      onChange={(e) => setRegData((prev) => ({ ...prev, passwordReEnter: e.target.value }))}
                      // value={regData.passwordReEnter}
                      type="password" name="passwordRe" id="passwordRe" required />

                    <button>Change Password</button>
                  </div>
                }
                {(leftMenu === "address") &&
                  <div className='uAccEditCont'>

                    <label htmlFor="addressL1">Address Line 1</label>
                    <input
                      onChange={(e) => setRegData((prev) => ({ ...prev, addressLine1: e.target.value }))}
                      value={regData.addressLine1}
                      type="text" name="addressL1" id="addressL1" required />

                    <label htmlFor="addressL2">Address Line 2</label>
                    <input
                      onChange={(e) => setRegData((prev) => ({ ...prev, addressLine2: e.target.value }))}
                      value={regData.addressLine2}
                      type="text" name="addressL2" id="addressL2" />

                    <label htmlFor="city">City</label>
                    <input
                      onChange={(e) => setRegData((prev) => ({ ...prev, city: e.target.value }))}
                      value={regData.city}
                      type="text" name="city" id="city" required />

                    <label htmlFor="state">State</label>
                    <input
                      onChange={(e) => setRegData((prev) => ({ ...prev, state: e.target.value }))}
                      value={regData.state}
                      type="text" name="state" id="state" required />

                    <label htmlFor="phone">Phone Number</label>
                    <input
                      onChange={(e) => setRegData((prev) => ({ ...prev, phone: e.target.value }))}
                      value={regData.phone}
                      type="text" name="phone" id="phone" required />

                    <button>Update Address</button>
                  </div>
                }
              </div>
            </div>
          </div>

        </div>
      </div>
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
    </div>
  )
}

export default UserAccount