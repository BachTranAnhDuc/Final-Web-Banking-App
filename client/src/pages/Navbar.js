import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../assets/images/logos/bankist.svg';

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <NavLink to={'/'}>
        <img src={Logo} alt="" className="nav-logo" />
      </NavLink>

      <ul className="nav-list">
        <li className="nav-list__item">
          <NavLink to={'/'} className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-list__item">
          <NavLink to={'/about'} className="nav-link">
            About me
          </NavLink>
        </li>
      </ul>

      <button className="btn btn-login">SignIn / Signout</button>
    </nav>
  );
};

export default Navbar;
