import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../assets/images/logos/bankist.svg';
import { useGlobalContext } from '../context/appContext';

const Navbar = () => {
  const [stickyClass, setStickyClass] = useState('nav-bar');
  const { switchPage } = useGlobalContext();

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
      <NavLink to={'/'} onClick={() => switchPage()}>
        <img src={Logo} alt="" className="nav-logo" />
      </NavLink>

      <ul className="nav-list">
        <li className="nav-list__item">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link__active' : 'nav-link'
            }
            onClick={() => switchPage()}
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
            onClick={() => switchPage()}
          >
            <span>About me</span>
          </NavLink>
        </li>
      </ul>

      <NavLink to={'/login'}>
        <button
          className="btn btn-login btn-white btn-animate"
          onClick={() => switchPage()}
        >
          Sign In
        </button>
      </NavLink>
    </nav>
  );
};

export default Navbar;
