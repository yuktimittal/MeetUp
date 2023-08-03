import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setUser(userInfo);

    if (!userInfo) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
export { AppContext, AppContextProvider };
