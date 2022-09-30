import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';

const ProtectedRoutePermission = ({ children }) => {
  const { user } = useGlobalContext();

  const { identify } = user;

  if (identify === 'success') {
    return children;
  } else {
    return <Navigate to="/dashboard/setting/all" />;
  }

  // if (identify === 'watting') {
  //   return children;
  // }

  // if (identify === 'processing') {
  //   return children;
  // }
};

export default ProtectedRoutePermission;
