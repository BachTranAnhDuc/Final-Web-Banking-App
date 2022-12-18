import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { NavDashboard, FooterDash, SideBar, Loading } from '../components';
import { useGlobalContext } from '../context/appContext';

import { FaBars } from 'react-icons/fa';

import SettingStyled from '../theme/pages/Setting';

import GlobalStyled from '../theme/base/Global';

// import {Toast} from '..'

const ShareLayoutDash = () => {
  const { isLoading, openSidebar, openModal, isSidebarOpen, styleBody } =
    useGlobalContext();

  return (
    <GlobalStyled>
      <div className={styleBody}>
        <NavDashboard></NavDashboard>
        {isLoading ? <Loading></Loading> : <Outlet></Outlet>}
        <FooterDash></FooterDash>

        <SideBar></SideBar>

        {isSidebarOpen && <div className="overlay"></div>}
      </div>
    </GlobalStyled>
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
