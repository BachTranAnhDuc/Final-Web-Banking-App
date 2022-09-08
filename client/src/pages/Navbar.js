import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../assets/images/logos/bankist.svg';

const Navbar = () => {
  const [stickyClass, setStickyClass] = useState('nav-bar');

  const stickyNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 100
        ? setStickyClass('nav-bar sticky')
        : setStickyClass('nav-bar');
    }

    // let windowHeight = window.scrollY;

    // console.log(windowHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', stickyNavbar);

    return () => {
      window.removeEventListener('scroll', stickyNavbar);
    };
  }, []);
  return (
    <nav className={stickyClass}>
      <NavLink to={'/'}>
        <img src={Logo} alt="" className="nav-logo" />
      </NavLink>

      <ul className="nav-list">
        <li className="nav-list__item">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link__active' : 'nav-link'
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav-list__item">
          <NavLink
            to={'/about'}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link__active' : 'nav-link'
            }
          >
            About me
          </NavLink>
        </li>
      </ul>

      <button className="btn btn-login btn-white btn-animate">
        SignIn / Signout
      </button>
    </nav>
  );
};

export default Navbar;
