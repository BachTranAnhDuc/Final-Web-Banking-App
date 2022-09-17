import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components';
import { useGlobalContext } from '../context/appContext';

const ShareLayout = () => {
  const { isLoading } = useGlobalContext();

  return (
    <main className="container">
      <Navbar></Navbar>
      <Outlet></Outlet>
      {!isLoading && <Footer></Footer>}
    </main>
  );
};

export default ShareLayout;
