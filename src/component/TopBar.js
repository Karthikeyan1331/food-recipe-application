
import '../login/sear.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckCred from '../TokenValidate';
const TopBar = () => {
  
  const navigate = useNavigate();
  function generateSrcSet(originalUrl) {
      // Split the URL at the '=s' part to extract the base URL
    const [baseUrl] = originalUrl.split('=s');
    // Generate the 1x and 2x versions of the image URL
    const src1x = `${baseUrl}=s96-c`;
    const src2x = `${baseUrl}=s192-c`;
    // Combine the URLs with '1x' and '2x' into the srcSet format
    const srcSet = `${src1x} 1x, ${src2x} 2x`;
    return srcSet;
  }
  const topNavData = (data) => {
    switch(data) {
      case 'Home':
        navigate("/");
        break;
      case 'Search':
        navigate("/Search");
        break;
      case 'History':
        navigate("/History");
        break;
      case 'Create':
        navigate("/Create");
        break;
      case 'Profile':
        navigate("/Profile");
        break;
      default:
        // Handle other cases if needed
        break;
    }
  };
  let temp = CheckCred();
  const [validate, setvalidate] = useState(temp)
  const [profilePic,setProfilePic] = useState(null)
  useEffect(() => {
    setvalidate(temp)
    if(temp){
      localStorage.setItem("useData",JSON.stringify(temp))
      
      setProfilePic(temp.profile)}
  }, [temp])
  const handleLogout = async () => {
    localStorage.removeItem("auth_code")
    localStorage.removeItem("useData")
    try {
      // Send a POST request to your backend logout endpoint
      const response = await axios.post('http://localhost:8000/logout');
      if (response.status === 200) {
        // Redirect to login page or perform any other action after successful logout
        window.location.href="./Login" // Redirect to login page
      } else {
        // Handle logout failure
        console.error('Logout failed:', response.data);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
  return (
    <div>
      <section id="SearchPhead">
        <div className="SearchPheadings mt-[1vw] mb-[1vw]">
          <img className='w-[60px] h-[60px] rounded-full mr-20 transform translate-y-[-10px]  border-2 border-gray-900'
            src="/image/logo.jpg"
            alt="Logo" />
          <h1 className='TopNavData' onClick={() => topNavData('Home')}>Home</h1>
          <h1 className='TopNavData' onClick={() => topNavData('Search')}>Search</h1>
          <h1 className='TopNavData' onClick={() => topNavData('History')}>History</h1>
          <h1 className='TopNavData' onClick={() => topNavData('Create')}>Create</h1>
        </div>

        <div className="SearchPsign mt-[1vw] mb-[1vw] py-1 mr-5">
          {validate ? (
            <div className='ml-[50px] flex'>
              <div onClick={handleLogout} className='rounded-lg font-bold cursor-pointer text-white bg-red-500 px-[12px] py-[10px] transition-all hover:bg-red-600'>
                LOG OUT</div>
              <div className='ml-5'>
                <img src = {profilePic!==null?profilePic:'img/slider-01.png'}
                onClick={() => topNavData('Profile')}
                id = "profilePic"
                alt='' className='border-2 border-black shadow-lg cursor-pointer w-[50px] h-[50px] rounded-full' />
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