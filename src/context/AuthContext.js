import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      return { token, username };
    }
    return null;
  });

  const login = (token, username) => {
    // เก็บ token และ username ลงใน localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setUserData({ token, username });
  };

  const logout = () => {
    // ลบ token และ username ออกจาก localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
