import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Toast = ({ position }) => {
  return <Toaster position={position} reverseOrder={true} />;
};

export default Toast;
