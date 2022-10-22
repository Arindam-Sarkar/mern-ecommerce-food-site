import React from 'react'
import './signUp.css'

const SignUp = () => {
  return (
    <div className='signUpMCont'>
      <form className='signUpCont'>

        <label htmlFor="email">Email <span className='signUpRequired'>*</span> </label>
        <input type="email" name="email" id="email" required />

        <label htmlFor="password">Password <span className='signUpRequired'>*</span></label>
        <input type="password" name="password" id="password" required />

        <label htmlFor="passwordRe">Re-type Password <span className='signUpRequired'>*</span></label>
        <input type="password" name="passwordRe" id="passwordRe" required />

        <label htmlFor="addressL1">Address Line 1 <span className='signUpRequired'>*</span> </label>
        <input type="text" name="addressL1" id="addressL1" required />

        <label htmlFor="addressL2">Address Line 2  </label>
        <input type="text" name="addressL2" id="addressL2" />

        <label htmlFor="city">City <span className='signUpRequired'>*</span> </label>
        <input type="text" name="city" id="city" required />

        <label htmlFor="city">State <span className='signUpRequired'>*</span> </label>
        <input type="text" name="city" id="city" required />

        <label htmlFor="phone">Phone Number<span className='signUpRequired'>*</span> </label>
        <input type="text" name="phone" id="phone" required />

        <div className='signUpbuttonCont'>
          <button className='signUpbutton'>Sign Up</button>
        </div>
        <div className='signUpAlreadyRegistered'>Already registered? Click Here to Login.</div>
      </form>

    </div>
  )
}

export default SignUp