import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery';
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorClass, setErrorClass] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const sendUserCredential = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log({ email, password });

    setErrorMessage("")
    if (!email && !password) {
      setErrorMessage("Please enter Email Id and Password")
    }
    else if (!email) {
      setErrorMessage('Please fill Email ID');
      return;
    }
    else if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    else if (!password) {
      setErrorMessage("Please fill Password");
    }
    // Send data to Node.js server
    $.ajax({
      url: 'http://localhost:8000/api/UserLogin', // Corrected URL
      method: 'POST',
      dataType: 'json', // Corrected data type
      data: JSON.stringify({ email, password }), // Stringify the data object
      contentType: 'application/json', // Specify content type for JSON data
      success: function (response) {
        console.log('Response:', response);
      },
      error: function (xhr, status, error) {
        console.error('Error:', error);
        // Handle the error here
      },
    });
  }
  const validateEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
        <input type="email"
          placeholder="Email"
          onChange={(e) => { setErrorMessage(''); setEmail(e.target.value) }}
        />

        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            className={`w-full ${errorClass}`}
            onChange={(e) => {
              setErrorMessage('');
              setPassword(e.target.value);
            }}
          />
          <i
            className={`bi${showPassword ? ' bi-eye-fill' : ' bi-eye-slash-fill'
              } text-[25px] absolute top-1/2 right-2 transform -translate-y-[15px] cursor-pointer text-gray-500`}
            onClick={handleTogglePassword}
          ></i>
        </div>
        {errorMessage &&
          <div className="text-grey-950 bg-red-500 mt-2 px-3 py-1 text-[13px] rounded-md">
            {errorMessage}
          </div>
        }
        <a href="/forgot-password"
          className='text-[12px] text-blue-500 font-bold ml-[11vw] my-[.5vw] hover:underline'>
          Forget Your Password?</a>
        <button onClick={sendUserCredential}>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn