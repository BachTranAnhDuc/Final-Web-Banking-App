import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavDashboard, FooterDash, SideBar, Loading } from '../components';
import { useGlobalContext } from '../context/appContext';

import { FaBars } from 'react-icons/fa';

const ShareLayoutDash = () => {
  const { isLoading, openSidebar, openModal, isSidebarOpen } =
    useGlobalContext();

  return (
    <div className="container__dashboard">
      <NavDashboard></NavDashboard>
      {isLoading ? <Loading></Loading> : <Outlet></Outlet>}
      <FooterDash></FooterDash>

      <SideBar></SideBar>

      {isSidebarOpen && <div className="overlay"></div>}
    </div>
  );
};

export default ShareLayoutDash;

//  return (
//    <main>
//      <button onClick={openSidebar} className="sidebar-toggle">
//        <FaBars />
//      </button>
//      <button onClick={openModal} className="btn">
//        show modal
//      </button>
//    </main>
//  );
