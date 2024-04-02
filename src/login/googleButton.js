import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config';

const GoogleSignUpButton = () => {
    const [googleClientId, setGoogleClientId] = useState('');
  useEffect(() => {
    // Fetch Google Client ID from the backend when the component mounts
    const fetchGoogleClientId = async () => {
      try {
        const response = await axios.post(`${API_URL}getGoogleClientId`);
        
        setGoogleClientId(response.data.Client_ID);
      } catch (error) {
        console.error('Error fetching Google Client ID:', error);
      }
    };

    fetchGoogleClientId();
  }, []);
  const handleGoogleSign = () => {
    window.open(`${API_URL}auth/google/callback`,
    "_self")
  };

  return (
    <button type="button" className="login-with-google-btn" onClick={handleGoogleSign}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignUpButton;
