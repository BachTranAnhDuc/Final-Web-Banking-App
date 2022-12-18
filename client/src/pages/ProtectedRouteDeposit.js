import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';

const ProtectedRouteDeposit = ({ children }) => {
  const { user, showToast } = useGlobalContext();
  const { identify } = user;

  if (identify === 'success') {
    return children;
  }

  return <Navigate to="/dashboard" />;
};

export default ProtectedRouteDeposit;
