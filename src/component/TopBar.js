import React from 'react'
import '../login/sear.css'


const TopBar = () => {
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
            <div className="SearchPsign mt-[1vw] mb-[1vw]">
                <div className='px-[1.5vw] py-[1vw]'>SIGN IN</div>
                <div className='bg-blue-500 ml-[.5vw] px-[1.5vw] py-[1vw] rounded-lg text-gray-50'>SIGN UP</div>
            </div>
        </section>
        <div className=''></div>
    </div>
  )
}

export default TopBar