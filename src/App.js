import './css/add.css'
import './css/home.css'
import './css/Trending.css'
import React, { useState, useEffect } from 'react'
import Trending from "./FrontPage/trend"
import Foot from "./FrontPage/foot"
import Home from "./FrontPage/home"
import axios from 'axios'
import $ from 'jquery';
import { useLocation, useNavigate } from 'react-router-dom';
function App() {
  axios.defaults.withCredentials = true
  const navigate = useNavigate();
  useEffect(() => {
    axios.post('http://localhost:8000/ValidToken',)
      .then((response) => {
        response = response.data
        console.log(response)
        if (response.valid) {
          console.log(true, response.message)
        }
        else {
          navigate('/Login', { state: false })
          console.log(response.message)
        }
      })
  })
  return (
    <div className="App">
      <Home />
      <Trending />
    </div>
  );
}

export default App;
