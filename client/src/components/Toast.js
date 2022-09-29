import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Toast = () => {
  return <Toaster position="bottom-right" reverseOrder={true} />;
};

export default Toast;
