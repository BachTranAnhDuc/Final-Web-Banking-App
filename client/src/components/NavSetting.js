import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';
// import { Toast } from '../components';

const NavSetting = () => {
  const { user, showToastSuccess, showToastError, showToast, switchSetting } =
    useGlobalContext();

  const { identify } = user;

  // const checkIdentify = new Promise((resolve, reject) => {
  //   if (identify === 'processing') {
  //     resolve();
  //   } else {
  //     reject();
  //   }
  // });

  const handleCheck = () => {
    switchSetting(1000);
    if (identify === 'processing') {
      // showToastError(
      //   'Your account is processing... \n\n You cannot access this router'
      // );

      showToast(
        '😔 Your account is processing... \n\n ❌ You cannot access this router',
        6000
      );
    }
  };

  return (
    <>
      <h2 className="heading--secondary setting__heading setting__border--bottom">
        Setting
      </h2>

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
    </>
  );
};

export default NavSetting;
