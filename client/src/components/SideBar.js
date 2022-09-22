import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineInbox } from 'react-icons/ai';
import { useGlobalContext } from '../context/appContext';
import { FaTimes } from 'react-icons/fa';

import logo from '../assets/images/logos/bankist.svg';

const SideBar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  return (
    <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
      <div className="sidebar-header">
        <img src={logo} className="sidebar-logo" alt="image" />
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>

      <ul className="sidebar-links">
        <li>
          <AiOutlineInbox className="sidebar-links__icon"></AiOutlineInbox>
          <a href="#">Something</a>
        </li>
        <li>
          <AiOutlineInbox className="sidebar-links__icon"></AiOutlineInbox>
          <a href="#">Something</a>
        </li>
        <li>
          <AiOutlineInbox className="sidebar-links__icon"></AiOutlineInbox>
          <a href="#">Something</a>
        </li>
        <li>
          <AiOutlineInbox className="sidebar-links__icon"></AiOutlineInbox>
          <a href="#">Something</a>
        </li>
        <li>
          <AiOutlineInbox className="sidebar-links__icon"></AiOutlineInbox>
          <a href="#">Something</a>
        </li>
      </ul>

      <ul className="sidebar__social-icons">
        <li>
          <BiUserCircle></BiUserCircle>
          <a href="#">Anh Duc</a>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
