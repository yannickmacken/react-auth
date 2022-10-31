import React, { useState } from 'react';

// Create auth context
const AuthContext = React.createContext({
  token: '',
  login: (token) => {},
  logout: () => {},
});

// Auth context wrapper component
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token)
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token', token)
  };

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