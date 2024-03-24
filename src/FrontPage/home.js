import React from 'react'
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleClick = (bool) => {
    navigate('/Login', { state: bool });
  };
  return (
    <div className='HomePage'>
        <div className='TopS'>
          <img className="logo rounded-full border-2" src="/image/logo.jpg" alt='hi'></img>
          <div className='NavBar'>
            <div>Home</div>
            <div><Link to="/Search">Search</Link></div>
            <div>Community</div>
            <div>Cusines</div>
            <div>About</div>
          </div>
          
            <div onClick={()=>{handleClick(false)}} className='SignIn'>SIGN IN <i className="bi bi-box-arrow-in-right"></i></div>
            
            <div onClick={()=>{handleClick(true)}} className='SignUp'>SIGN UP</div>
          
        </div>
        
        <div className='LeftS'>
          <div className='About'>Savor Every Moment, Taste Every Bite</div>
          <div className='Cook'>Let'S Cook!</div>
          <div className='des'>Explore 6000+ Delicious Recipes Today</div>
          <div className="ButtonS">Search</div>
        </div>
        <div className='RightS'>
          
          <img className='san' src='/image/Food1.png' alt=''></img>
          
          <div className='Ron6'></div>
          <div className='Ron1'></div>
          <div className='Ron2'></div>
          <div className='Ron3'></div>
          <div className='Ron4'></div>
          <div className='Ron5'></div>
          <img className='san1' src='/image/Noodles.png' alt=''></img>
          <img className='san2' src='/image/taco.png' alt=''></img>
          <img className='san3' src='/image/Cup.png' alt=''></img>
        </div>
      </div>
  )
}

export default Home