import React, { useState, useEffect } from 'react';

import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';

import Logo from '../assets/images/logos/BANK.svg';
import avt1 from '../assets/images/avt/avatar-01.svg';

import { FaBars } from 'react-icons/fa';
import { VscSettingsGear } from 'react-icons/vsc';
import { RiUserLine, RiLogoutCircleRLine } from 'react-icons/ri';

//
import { Menu, MenuItem, MenuButton, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
// import '@szhsin/react-menu/dist/transitions/slide.css';

const NavDashboard = () => {
  const {
    switchPage,
    openSidebar,
    logout,
    user,
    showStyleBody,
    hideStyleBody,
  } = useGlobalContext();

  const [display, setDisplay] = useState('arrow');
  const [align, setAlign] = useState('center');
  const [position, setPosition] = useState('anchor');
  const [viewScroll, setViewScroll] = useState('auto');
  const [direction, setDirection] = useState('bottom');
  const [stickyClass, setStickyClass] = useState('nav-dash');

  const navigate = useNavigate();

  const handleClickLog = () => {
    logout();

    switchPage();

    // navigate('/login');

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleClick = (input) => {
    if (input) {
      showStyleBody();
    } else {
      hideStyleBody();
    }
    switchPage();
  };

  const stickyNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 400
        ? setStickyClass('nav-dash sticky')
        : setStickyClass('nav-dash');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', stickyNavbar);

    return () => {
      window.removeEventListener('scroll', stickyNavbar);
    };
  }, []);

  return (
    <nav className={stickyClass}>
      <div className="nav-dash__left-side">
        <button onClick={openSidebar} className="sidebar-toggle">
          <FaBars />
        </button>
        <NavLink to={'/dashboard'} onClick={() => handleClick(false)}>
          <img src={Logo} alt="" className="nav-dash__logo" />
        </NavLink>

        <ul className="nav-dash__list">
          <li className="nav-dash__list--item">
            <NavLink
              to={'/dashboard'}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link__active' : 'nav-link'
              }
              onClick={() => switchPage()}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-dash__list--item">
            <NavLink
              to={'/about'}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link__active' : 'nav-link'
              }
              onClick={() => switchPage()}
            >
              <span>Users</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="nav-dash__right-side">
        <img src={avt1} alt="avatar" className="nav__menu--img" />

        <Menu
          className={'nav__menu'}
          menuButton={
            <MenuButton className={'btn-account'}>{user?.name}</MenuButton>
          }
          key={direction}
          direction={direction}
          align={align}
          position={position}
          viewScroll={viewScroll}
          arrow={display === 'arrow'}
          offsetX={
            display === 'offset' &&
            (direction === 'left' || direction === 'right')
              ? 12
              : 0
          }
          offsetY={
            display === 'offset' &&
            (direction === 'top' || direction === 'bottom')
              ? 12
              : 0
          }
        >
          <MenuItem className={'nav__menu--item'}>
            <RiUserLine></RiUserLine>
            <Link
              to="/dashboard/setting/account"
              className="btn-link"
              onClick={() => handleClick(true)}
            >
              View account
            </Link>
          </MenuItem>
          <MenuItem className={'nav__menu--item'}>
            <VscSettingsGear></VscSettingsGear>
            <Link
              to="/dashboard/setting/all"
              className="btn-link"
              onClick={() => handleClick(true)}
            >
              Setting
            </Link>
          </MenuItem>

          <MenuDivider />

          <MenuItem className={'nav__menu--item'} onClick={handleClickLog}>
            <RiLogoutCircleRLine></RiLogoutCircleRLine>
            <span>Logout</span>
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default NavDashboard;
