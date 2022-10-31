import React, { useEffect, useState, useCallback } from 'react';

// Create auth context
const AuthContext = React.createContext({
  token: '',
  login: (token) => {},
  logout: () => {},
});

// Calculate remaining time that token is valid
function calculateRemainingTime(expirationTime) {
  const currentTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationTime).getTime()
  const remainingTime = adjExpirationTime - currentTime
  return remainingTime
}

// Logout timer
let logoutTimer

// Auth context wrapper component
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);

  // Logouthandler removes token and expiration time
  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])
  
  // Loginhandler sets token on local storage and triggers settimeout 
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token)
    localStorage.setItem('expirationTime', expirationTime)
    logoutTimer = setTimeout(logoutHandler, calculateRemainingTime(expirationTime))
  }
  
  // Check if token still valid on component reload, trigger settimeout
  useEffect(() => {
    if (token) { // If not token no need to check
    const expTime = localStorage.getItem('expirationTime')
    console.log('reload', expTime)
    logoutTimer = setTimeout(logoutHandler, calculateRemainingTime(expTime))
  }}, [token, logoutHandler])

  const contextValue = {
    token: token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

// Context needs to be exported for useContext
export default AuthContext;