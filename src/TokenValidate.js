import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TokenValidation = () => {
  const navigate = useNavigate();
  const [tokenVariable, setTokenVariable] = useState(null)
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.post('http://localhost:8000/ValidToken')
      .then((response) => {
        response = response.data;
        console.log(response);
        if (response.valid) {
          setTokenVariable(response.message)
        } else {
          setTokenVariable(false)
          navigate('/Login', { state: false });
          console.log(response.message);
        }
      });
  }, []);

  return tokenVariable;// Since this component is for logic only, return null
};

export default TokenValidation;