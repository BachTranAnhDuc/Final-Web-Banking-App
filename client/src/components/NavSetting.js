import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';
// import { Toast } from '../components';
import avt from '../assets/images/avt/avatar-01.svg';

import { FaUserAlt } from 'react-icons/fa';

const NavSetting = () => {
  const { user, showToastSuccess, showToastError, showToast, switchSetting } =
    useGlobalContext();

  const { identify, name, role } = user;

  const handleCheck = () => {
    switchSetting(1000);
    if (identify === 'processing') {
      showToast(
        '😔 Your account is processing... \n\n ❌ You cannot access this router',
        6000,
        'error'
      );
    }
  };

  return (
    <div className="setting-header">
      <div className="setting-header__context">
        <h2 className="heading--secondary setting__heading ">{name}</h2>

        <div className="setting-header__roles">
          <FaUserAlt className="setting-header__roles--icon"></FaUserAlt>
          <span className="setting-header__roles--text">{role}</span>
        </div>
      </div>

      <img src={avt} alt="avt" className="setting-header__avt" />

      <nav className="setting-nav">
        <NavLink
          to={'/dashboard/setting/account'}
          className={({ isActive }) =>
            isActive
              ? 'setting-nav__link setting-nav__link--active'
              : 'setting-nav__link'
          }
          onClick={() => switchSetting(1000)}
        >
          <span>My Account</span>
        </NavLink>
        <NavLink
          to={'/dashboard/setting/upload'}
          className={({ isActive }) =>
            isActive
              ? 'setting-nav__link setting-nav__link--active'
              : 'setting-nav__link'
          }
          onClick={() => switchSetting(1000)}
        >
          <span>Identity</span>
        </NavLink>
        <NavLink
          to={'/dashboard/setting/deposit'}
          className={({ isActive }) =>
            isActive
              ? 'setting-nav__link setting-nav__link--active'
              : 'setting-nav__link'
          }
          onClick={() => handleCheck()}
        >
          <span>Deposit</span>
        </NavLink>
        <NavLink
          to={'/dashboard/setting/security'}
          className={({ isActive }) =>
            isActive
              ? 'setting-nav__link setting-nav__link--active'
              : 'setting-nav__link'
          }
          onClick={() => switchSetting(1000)}
        >
          <span>Security</span>
        </NavLink>
        <NavLink
          to={'/dashboard/setting/password'}
          className={({ isActive }) =>
            isActive
              ? 'setting-nav__link setting-nav__link--active'
              : 'setting-nav__link'
          }
          onClick={() => switchSetting(1000)}
        >
          <span>Password</span>
        </NavLink>
        <NavLink
          to={'/dashboard/setting/all'}
          className={({ isActive }) =>
            isActive
              ? 'setting-nav__link setting-nav__link--active'
              : 'setting-nav__link'
          }
          onClick={() => switchSetting(1000)}
        >
          <span>Setting</span>
        </NavLink>
      </nav>

      {/* <Toast></Toast> */}
    </div>
  );
};

export default NavSetting;
