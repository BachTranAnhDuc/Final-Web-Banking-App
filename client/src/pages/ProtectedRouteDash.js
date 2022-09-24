import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';

const ProtectedRouteDash = ({ children }) => {
  const { user } = useGlobalContext();

  const { isFirstLogin } = user;

  if (!isFirstLogin) {
    return children;
  }

  return <Navigate to="/first-login" />;
};

export default ProtectedRouteDash;
