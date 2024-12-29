import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CookieHandler = () => {
  const [cookies, setCookies] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  // Function to retrieve cookies from document
  const getCookies = () => {
    const allCookies = document.cookie.split(';');
    let cookiesObj = [];

    allCookies.forEach((cookie) => {
      const [key, value] = cookie.split('=');
      cookiesObj.push({
        key: key.trim(),
        value: value ? value.trim() : '',
        domain: window.location.hostname, // Assumes the current domain
        path: window.location.pathname,
        hostOnly: false,
        creation: new Date().toISOString(),  // Placeholder for creation timestamp
        lastAccessed: new Date().toISOString() // Placeholder for last accessed timestamp
      });
    });

    setCookies(cookiesObj);
  };

  // Function to send cookies to backend
  const sendCookiesToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cookies', cookies);
      setResponseMessage(response.data.message); // Display backend response message
    } catch (error) {
      console.error('Error sending cookies to backend:', error);
      setResponseMessage('Error sending cookies to backend');
    }
  };

  // Get cookies on component mount
  useEffect(() => {
    getCookies();
  }, []);

  return (
    <div>
      <h1>Cookies in Browser</h1>
      <button onClick={sendCookiesToBackend}>Send Cookies to Backend</button>
      <div>
        <h2>Cookies List:</h2>
        <ul>
          {cookies.map((cookie, index) => (
            <li key={index}>
              <strong>{cookie.key}</strong>: {cookie.value}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Backend Response:</h2>
        <p>{responseMessage}</p>
      </div>
    </div>
  );
};

export default CookieHandler;
