
import '../login/sear.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckCred from '../TokenValidate';
const TopBar = () => {
  const navigate = useNavigate();
  let temp = CheckCred();
  const [validate, setvalidate] = useState(temp)
  useEffect(() => {
    setvalidate(temp)
  }, [temp])
  console.log(validate)
  return (
    <div>
      <section id="SearchPhead">
        <div className="SearchPheadings mt-[1vw] mb-[1vw]">
          <img className='w-[4vw] h-[4vw] rounded-full mr-20 transform translate-y-[-10px]  border-2 border-gray-900'
            src="/image/logo.jpg"
            alt="Logo" />
          <h1>Home</h1>
          <h1>Search</h1>
          <h1>Community</h1>
          <h1>Articles</h1>
          <h1>About</h1>
        </div>

        <div className="SearchPsign mt-[1vw] mb-[1vw] py-1">
          {validate ? (
            <div className='ml-[50px] flex'>
              <div className='rounded-lg font-bold cursor-pointer text-white bg-red-500 px-[1vw] py-[.6vw] transition-all hover:bg-red-600'>
                LOG OUT</div>
              <div className='ml-5'>
                <img src='img/slider-01.png' alt='' className='border-2 border-black shadow-lg cursor-pointer w-[50px] h-[50px] rounded-full' />
              </div>
            </div>

          ) : (
            <>
              <div className='px-[1.5vw] py-[1vw]'>SIGN IN</div>
              <div className='bg-blue-500 ml-[.5vw] px-[1.5vw] py-[1vw] rounded-lg text-gray-50'>SIGN UP</div>
            </>
          )}
        </div>

      </section>
    </div>
  )
}

export default TopBar