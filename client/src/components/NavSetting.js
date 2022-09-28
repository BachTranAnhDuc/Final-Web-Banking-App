import React from 'react';
import { NavLink } from 'react-router-dom';

const NavSetting = () => {
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
        >
          <span>Security</span>
        </NavLink>
        <NavLink
          to={'/dashboard/setting/all'}
          className={({ isActive }) =>
            isActive
              ? 'setting-nav__link setting-nav__link--active'
              : 'setting-nav__link'
          }
        >
          <span>Setting</span>
        </NavLink>
      </nav>
    </>
  );
};

export default NavSetting;
