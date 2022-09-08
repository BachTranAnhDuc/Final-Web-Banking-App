import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Navbar = () => {
  return (
    <div className="container">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Navbar;
