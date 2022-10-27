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
  const [leftMenu, setLeftMenu] = useState("password")
  const [updateError, setUpdateError] = useState({ errPresent: false, errMsg: "" })

  const userAuthData = useSelector((state) => state.userAuth.userAuthData)


  const [regData, setRegData] = useState({
    username: "", oldPassword: "", newPassword: "",
    newPasswordReEnter: "", addressLine1: "", addressLine2: "",
    city: "", state: "", email: "", phone: ""
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Update regdata so that the address form has prefilled values
  useEffect(() => {
    setRegData({
      username: userAuthData.username,
      oldPassword: "",
      newPassword: "",
      newPasswordReEnter: "",
      addressLine1: userAuthData.addressLine1,
      addressLine2: userAuthData.addressLine2,
      city: userAuthData.city,
      state: userAuthData.state,
      email: userAuthData.email,
      phone: userAuthData.phone
    })
  }, [userAuthData])


  const userPasswordUpdateHandler = async (e) => {
    e.preventDefault();

    if (regData.oldPassword.length === 0) {
      setUpdateError({ errPresent: true, errMsg: "Error - Password cannot be blank" })
    }
    else if (regData.newPassword.length === 0) {
      setUpdateError({ errPresent: true, errMsg: "Error - Password cannot be blank" })
    }
    else if (regData.newPassword !== regData.newPasswordReEnter) {
      setUpdateError({ errPresent: true, errMsg: "Error - Both Passwords Must be Same" })
    }
    else {
      try {
        const { oldPassword, newPassword } = regData
        const resp = await axios.post(`/user/updatePass/${userAuthData._id}`,
          { oldPassword, newPassword })

        if (resp.data?._id !== undefined) {
          // Update Successful, put this user data in redux store
          dispatch(addUserAuthData(resp.data))
          toast("Password Update Successful")

          // Clear error message
          setUpdateError({ errPresent: false, errMsg: "" })
        }
      } catch (error) {
        if ((error.response.data.message?.match('Wrong password'))) {
          setUpdateError({ errPresent: true, errMsg: "Error - Old Password Wrong" })
          toast("Error - Old Password Wrong")
        }
        window.scrollTo(0, 0)

      }
    }
  }

  const userAddressUpdateHandler = async (e) => {
    e.preventDefault();

    const { addressLine1, addressLine2, city, state, phone, ...remaining } = regData

    try {
      const resp = await axios.post(`/user/updateAdd/${userAuthData._id}`,
        { addressLine1, addressLine2, city, state, phone }
      )

      if (resp.data?._id !== undefined) {
        // Update Successful, put this user data in redux store
        dispatch(addUserAuthData(resp.data))
        toast("Address Update Successful")

        // Clear error message
        setUpdateError({ errPresent: false, errMsg: "" })
      }
    } catch (error) {
      setUpdateError({ errPresent: true, errMsg: "Something Went Wrong - Update Failure" })
      toast("Something Went Wrong")
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

                    {(updateError.errPresent === true) &&
                      <div className='uAccErrorMessage'>
                        {updateError.errMsg}
                      </div>}

                    <label htmlFor="password">Old Password<span className='uAccRequired'>*</span></label>
                    <input
                      onChange={(e) => setRegData((prev) => ({ ...prev, oldPassword: e.target.value }))}
                      // value={regData.password}
                      type="password" name="password" id="password" required />

                    <label htmlFor="password">New Password<span className='uAccRequired'>*</span></label>
                    <input
                      onChange={(e) => setRegData((prev) => ({ ...prev, newPassword: e.target.value }))}
                      // value={regData.password}
                      type="password" name="password" id="password" required />

                    <label htmlFor="passwordRe">Re-type New Password</label>
                    <input
                      onChange={(e) => setRegData((prev) => ({ ...prev, newPasswordReEnter: e.target.value }))}
                      // value={regData.passwordReEnter}
                      type="password" name="passwordRe" id="passwordRe" required />

                    <button onClick={(e) => userPasswordUpdateHandler(e)}
                    >Change Password</button>
                  </div>
                }
                {(leftMenu === "address") &&
                  <div className='uAccEditCont'>

                    {(updateError.errPresent === true) &&
                      <div className='uAccErrorMessage'>
                        {updateError.errMsg}
                      </div>}

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

                    <button onClick={(e) => userAddressUpdateHandler(e)}>Update Address</button>
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