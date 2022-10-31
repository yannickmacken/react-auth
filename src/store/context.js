import React, { useState } from 'react';

// Create auth context
const AuthContext = React.createContext({
  token: '',
  login: (token) => {},
  logout: () => {},
});

// Auth context wrapper component
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
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