import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const ShareLayout = () => {
  return (
    <div className="container">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default ShareLayout;
