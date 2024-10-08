import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { userData } = useContext(AuthContext);

  // ถ้าไม่มี token หรือ username ส่งกลับไปที่หน้า login
  if (!userData) {
    return <Navigate to="/login" />;
  }

  // ถ้ามี token และ username ให้แสดงเนื้อหาของแต่ละหน้า
  return children;
};

export default PrivateRoute;
