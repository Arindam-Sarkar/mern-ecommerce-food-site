import React from 'react'
import './login.css'

const Login = () => {
  return (
    <div className='loginMCont'>
      <form className='loginCont'>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />

        <button>Login</button>

        <div className='loginNewUser'>New User? Click Here to Sign-Up.</div>
      </form>

    </div>
  )
}

export default Login