import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
const signIn = () => {
    
  return (
    <div className="login-form-container login-sign-in">
        
          <form>
            <div className='text-[30px] topCreSign'>Sign In</div>
            <div className="login-social-icons">
              <a href="/google-signup" className="login-icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
            </div>
            <div className='text-sm'>or use your email password</div>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="/forgot-password"
              className='text-[12px] text-blue-500 font-bold ml-[11vw] my-[.5vw] hover:underline'>
              Forget Your Password?</a>
            <button>Sign In</button>
          </form>
        </div>
  )
}

export default signIn