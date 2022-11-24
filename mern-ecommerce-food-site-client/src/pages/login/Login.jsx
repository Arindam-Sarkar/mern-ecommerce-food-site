import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addUserAuthData, removeUserAuthData } from '../../features/userAuth/userAuth'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './login.css'
import { serverUrl } from '../../serverUrl';


const Login = () => {
  const [loginData, setlogindata] = useState({ email: "", password: "" })
  const [loginError, setLoginError] = useState({ errPresent: false, errMsg: "" })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLoginHandler = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(`${serverUrl}/user/login/`, loginData)
      // Clear error message
      setLoginError({ errPresent: false, errMsg: "" })

      console.log(resp)
      if (resp.data?._id !== undefined) {
        toast("Login Successful")

        // Login Successful, put this user data in redux store
        dispatch(addUserAuthData(resp.data))

        // Navigate to home page
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      if ((error.response.data.message?.match('Wrong password or username'))) {
        setLoginError({ errPresent: true, errMsg: "Error - Wrong password or username" })
        toast("Error - Wrong password or username")
      } else {
        setLoginError({ errPresent: true, errMsg: "Error - Something went wrong" })
        toast("Error - Something went wrong")
      }
      window.scrollTo(0, 0)
    }
  }

  // useEffect(() => {
  //   console.log(loginData);
  // }, [loginData])

  return (
    <div className='loginMCont'>
      <form className='loginCont'
        onSubmit={(e) => userLoginHandler(e)}>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required
          onChange={(e) => setlogindata((prev) => ({ ...prev, email: e.target.value }))} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required
          onChange={(e) => setlogindata((prev) => ({ ...prev, password: e.target.value }))} />

        <div className='loginButtonCont'>
          <button className='loginButton'> Login</button>
        </div>
      </form>

      <div className='loginNewUser'
        onClick={() => navigate('/signup')}>
        New User? Click Here to Sign-Up.
      </div>

      <h7 className='loginDummyCredentials'>Dummy Credentials : u4@u4.com, Password: u4</h7>

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
  )
}

export default Login