import React, { useEffect } from 'react'
import { useState } from 'react'
import './signUp.css'


import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { addUserAuthData, removeUserAuthData } from '../../features/userAuth/userAuth'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverUrl } from '../../serverUrl';


let dummyData = {
  username: "u4",
  password: "u4",
  passwordReEnter: "u4",
  addressLine1: "flat no 1,123 street,",
  addressLine2: "near main shop",
  city: "city 1",
  state: "state 1",
  email: "u4@u4.com",
  phone: "1223456789"
}

const SignUp = () => {
  const [regError, setRegError] = useState({ errPresent: false, errMsg: "" })
  const [regData, setRegData] = useState({
    username: "", password: "", passwordReEnter: "",
    addressLine1: "", addressLine2: "",
    city: "", state: "", email: "", phone: ""
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()



  const userSignUpHandler = async (e) => {
    e.preventDefault();

    // `${serverUrl}/user/register/`
    try {
      const resp = await axios.post(`${serverUrl}/user/register/`, regData)
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


  // useEffect(() => {
  //   setRegData(dummyData)
  // }, [])


  return (
    <div className='signUpMCont'>
      <form className='signUpCont' onSubmit={(e) => userSignUpHandler(e)}>

        <div className='signUpTopMsg'>Fields marked '*' are compulsary</div>

        <label htmlFor="userName">Username</label>
        <input
          onChange={(e) => setRegData((prev) => ({ ...prev, username: e.target.value }))}
          value={regData.username}
          type="text" name="userName" id="userName" required />

        <label htmlFor="password">Password <span className='signUpRequired'>*</span></label>
        <input
          onChange={(e) => setRegData((prev) => ({ ...prev, password: e.target.value }))}
          value={regData.password}
          type="password" name="password" id="password" required />

        <label htmlFor="passwordRe">Re-type Password <span className='signUpRequired'>*</span></label>
        <input
          onChange={(e) => setRegData((prev) => ({ ...prev, passwordReEnter: e.target.value }))}
          value={regData.passwordReEnter}
          type="password" name="passwordRe" id="passwordRe" required />

        <label htmlFor="addressL1">Address Line 1 <span className='signUpRequired'>*</span> </label>
        <input
          onChange={(e) => setRegData((prev) => ({ ...prev, addressLine1: e.target.value }))}
          value={regData.addressLine1}
          type="text" name="addressL1" id="addressL1" required />

        <label htmlFor="addressL2">Address Line 2  </label>
        <input
          onChange={(e) => setRegData((prev) => ({ ...prev, addressLine2: e.target.value }))}
          value={regData.addressLine2}
          type="text" name="addressL2" id="addressL2" />

        <label htmlFor="city">City <span className='signUpRequired'>*</span> </label>
        <input
          onChange={(e) => setRegData((prev) => ({ ...prev, city: e.target.value }))}
          value={regData.city}
          type="text" name="city" id="city" required />

        <label htmlFor="state">State <span className='signUpRequired'>*</span> </label>
        <input
          onChange={(e) => setRegData((prev) => ({ ...prev, state: e.target.value }))}
          value={regData.state}
          type="text" name="state" id="state" required />

        <label htmlFor="email">Email <span className='signUpRequired'>*</span> </label>
        <input
          onChange={(e) => setRegData((prev) => ({ ...prev, email: e.target.value }))}
          value={regData.email}
          type="email" name="email" id="email" required />

        <label htmlFor="phone">Phone Number<span className='signUpRequired'>*</span> </label>
        <input
          onChange={(e) => setRegData((prev) => ({ ...prev, phone: e.target.value }))}
          value={regData.phone}
          type="text" name="phone" id="phone" required />

        <div className='signUpbuttonCont'>
          <button className='signUpbutton' type='submit'>Sign Up</button>
        </div>

        <div className='signUpAlreadyRegistered'
          onClick={() => navigate('/login')}>
          Already registered? Click Here to Login.
        </div>
      </form>

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

export default SignUp